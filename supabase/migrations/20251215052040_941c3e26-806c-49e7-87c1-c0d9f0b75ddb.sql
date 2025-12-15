-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function that checks for role in metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  user_role text;
BEGIN
  -- Get role from metadata, default to 'passenger'
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'passenger');
  
  -- Insert profile
  INSERT INTO public.profiles (user_id, full_name, phone)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'phone'
  );
  
  -- Insert wallet
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.id);
  
  -- Insert user role based on metadata
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role::app_role);
  
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();