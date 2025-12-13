-- Create app roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'driver', 'passenger');

-- Create ride status enum
CREATE TYPE public.ride_status AS ENUM ('searching', 'confirmed', 'in_progress', 'completed', 'cancelled');

-- Create vehicle type enum
CREATE TYPE public.vehicle_type AS ENUM ('hatchback', 'sedan', 'suv');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  government_id_verified BOOLEAN DEFAULT FALSE,
  eco_credits INTEGER DEFAULT 0,
  total_carbon_saved DECIMAL(10, 2) DEFAULT 0,
  total_distance_shared DECIMAL(10, 2) DEFAULT 0,
  rating DECIMAL(2, 1) DEFAULT 5.0,
  total_rides INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create vehicles table (for drivers)
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vehicle_type vehicle_type NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  license_plate TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  seats_available INTEGER DEFAULT 4,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create rides table
CREATE TABLE public.rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES auth.users(id),
  vehicle_id UUID REFERENCES public.vehicles(id),
  status ride_status DEFAULT 'searching',
  pickup_lat DECIMAL(10, 8) NOT NULL,
  pickup_lng DECIMAL(11, 8) NOT NULL,
  pickup_address TEXT NOT NULL,
  dropoff_lat DECIMAL(10, 8) NOT NULL,
  dropoff_lng DECIMAL(11, 8) NOT NULL,
  dropoff_address TEXT NOT NULL,
  is_sharing_enabled BOOLEAN DEFAULT TRUE,
  max_passengers INTEGER DEFAULT 4,
  base_fare DECIMAL(10, 2) NOT NULL,
  distance_km DECIMAL(10, 2),
  estimated_duration_mins INTEGER,
  actual_start_time TIMESTAMPTZ,
  actual_end_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create ride_passengers table (junction table for passengers in a ride)
CREATE TABLE public.ride_passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES public.rides(id) ON DELETE CASCADE NOT NULL,
  passenger_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  is_captain BOOLEAN DEFAULT FALSE,
  pickup_lat DECIMAL(10, 8) NOT NULL,
  pickup_lng DECIMAL(11, 8) NOT NULL,
  pickup_address TEXT NOT NULL,
  dropoff_lat DECIMAL(10, 8) NOT NULL,
  dropoff_lng DECIMAL(11, 8) NOT NULL,
  dropoff_address TEXT NOT NULL,
  original_fare DECIMAL(10, 2) NOT NULL,
  final_fare DECIMAL(10, 2),
  wallet_cashback DECIMAL(10, 2) DEFAULT 0,
  carbon_saved DECIMAL(10, 2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  approved_by_captain BOOLEAN DEFAULT FALSE,
  approved_by_driver BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (ride_id, passenger_id)
);

-- Create wallet table
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  balance DECIMAL(10, 2) DEFAULT 0,
  eco_credits INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wallet_transactions table
CREATE TABLE public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES public.wallets(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  transaction_type TEXT NOT NULL,
  description TEXT,
  ride_id UUID REFERENCES public.rides(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create driver_earnings table
CREATE TABLE public.driver_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ride_id UUID REFERENCES public.rides(id) ON DELETE CASCADE NOT NULL,
  total_collected DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  net_earnings DECIMAL(10, 2) NOT NULL,
  bonus DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ride_passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_earnings ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User roles policies
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own roles" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Vehicles policies
CREATE POLICY "Anyone can view active vehicles" ON public.vehicles FOR SELECT USING (is_active = true);
CREATE POLICY "Drivers can manage own vehicles" ON public.vehicles FOR ALL USING (auth.uid() = driver_id);

-- Rides policies
CREATE POLICY "Users can view rides they're part of" ON public.rides FOR SELECT USING (
  driver_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.ride_passengers WHERE ride_id = id AND passenger_id = auth.uid())
);
CREATE POLICY "Anyone can view available shared rides" ON public.rides FOR SELECT USING (status = 'searching' AND is_sharing_enabled = true);
CREATE POLICY "Authenticated users can create rides" ON public.rides FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Drivers can update their rides" ON public.rides FOR UPDATE USING (driver_id = auth.uid());

-- Ride passengers policies
CREATE POLICY "Users can view ride passengers for their rides" ON public.ride_passengers FOR SELECT USING (
  passenger_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.rides WHERE id = ride_id AND driver_id = auth.uid())
);
CREATE POLICY "Users can join rides" ON public.ride_passengers FOR INSERT WITH CHECK (auth.uid() = passenger_id);
CREATE POLICY "Users can update own passenger entry" ON public.ride_passengers FOR UPDATE USING (passenger_id = auth.uid());

-- Wallets policies
CREATE POLICY "Users can view own wallet" ON public.wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own wallet" ON public.wallets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can create wallet" ON public.wallets FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Wallet transactions policies
CREATE POLICY "Users can view own transactions" ON public.wallet_transactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.wallets WHERE id = wallet_id AND user_id = auth.uid())
);

-- Driver earnings policies
CREATE POLICY "Drivers can view own earnings" ON public.driver_earnings FOR SELECT USING (auth.uid() = driver_id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.id);
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'passenger');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rides_updated_at BEFORE UPDATE ON public.rides FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();