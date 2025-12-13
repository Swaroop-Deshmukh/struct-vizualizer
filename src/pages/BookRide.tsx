import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  MapPin, 
  Navigation, 
  Car, 
  Users, 
  Clock, 
  Leaf,
  ChevronRight,
  Minus,
  Plus,
  Wallet,
  CreditCard
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const vehicleTypes = [
  { 
    id: "hatchback", 
    name: "Hatchback", 
    price: "₹120", 
    time: "3 min", 
    seats: 3,
    description: "Economical & compact"
  },
  { 
    id: "sedan", 
    name: "Sedan", 
    price: "₹180", 
    time: "5 min", 
    seats: 4,
    description: "Comfortable ride"
  },
  { 
    id: "suv", 
    name: "SUV", 
    price: "₹250", 
    time: "7 min", 
    seats: 6,
    description: "Spacious & premium"
  },
];

export default function BookRide() {
  const [step, setStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState("Current Location");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [sharingEnabled, setSharingEnabled] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState("sedan");
  const [maxPassengers, setMaxPassengers] = useState(2);

  const handleBookRide = () => {
    toast({
      title: "🚗 Ride Booked!",
      description: sharingEnabled 
        ? "Looking for co-passengers to share your ride..." 
        : "Finding a driver for your solo ride...",
    });
  };

  const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);
  const estimatedSavings = sharingEnabled ? "Up to 40%" : "0%";

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-foreground">Book a Ride</h1>
        <p className="text-muted-foreground mt-1">Enter your destination to get started</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Booking Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Location Input */}
          <Card className="border-0 shadow-card">
            <CardContent className="p-6 space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                </div>
                <Input 
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="pl-10 h-14 text-base bg-secondary/50 border-0"
                  placeholder="Pickup location"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
                >
                  <Navigation className="h-4 w-4 mr-1" />
                  Locate
                </Button>
              </div>
              
              <div className="flex items-center gap-2 pl-5">
                <div className="w-0.5 h-8 bg-border" />
              </div>
              
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <Input 
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="pl-10 h-14 text-base bg-secondary/50 border-0"
                  placeholder="Where to?"
                />
              </div>
            </CardContent>
          </Card>

          {/* Sharing Toggle */}
          <Card className={`border-2 transition-colors ${sharingEnabled ? 'border-sharing bg-sharing/5' : 'border-border'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${sharingEnabled ? 'gradient-sharing' : 'bg-muted'}`}>
                    <Users className={`h-6 w-6 ${sharingEnabled ? 'text-sharing-foreground' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">Sharing Mode</p>
                      {sharingEnabled && (
                        <Badge className="bg-eco/10 text-eco border-0">
                          <Leaf className="h-3 w-3 mr-1" />
                          Eco-Friendly
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {sharingEnabled 
                        ? "Share your ride and save up to 40% on fare" 
                        : "Travel solo with full privacy"}
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={sharingEnabled} 
                  onCheckedChange={setSharingEnabled}
                  className="data-[state=checked]:bg-sharing"
                />
              </div>

              {sharingEnabled && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Max Co-Passengers</p>
                      <p className="text-xs text-muted-foreground">How many can join your ride?</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setMaxPassengers(Math.max(1, maxPassengers - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold w-8 text-center">{maxPassengers}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setMaxPassengers(Math.min(3, maxPassengers + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Vehicle Selection */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-display">Choose Vehicle</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedVehicle} onValueChange={setSelectedVehicle} className="space-y-3">
                {vehicleTypes.map((vehicle) => (
                  <div key={vehicle.id}>
                    <RadioGroupItem value={vehicle.id} id={vehicle.id} className="peer sr-only" />
                    <Label
                      htmlFor={vehicle.id}
                      className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                          <Car className="h-6 w-6 text-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{vehicle.name}</p>
                          <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{vehicle.price}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{vehicle.time}</span>
                          <span>•</span>
                          <span>{vehicle.seats} seats</span>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Fare Summary */}
        <div className="space-y-6">
          <Card className="border-0 shadow-card sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg font-display">Fare Estimate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base fare</span>
                  <span className="font-medium">{selectedVehicleData?.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Distance (est.)</span>
                  <span className="font-medium">~12 km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time (est.)</span>
                  <span className="font-medium">~25 min</span>
                </div>
                
                {sharingEnabled && (
                  <div className="flex justify-between text-sm text-eco">
                    <span className="flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      Sharing discount
                    </span>
                    <span className="font-medium">-{estimatedSavings}</span>
                  </div>
                )}
                
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">{selectedVehicleData?.price}</p>
                      {sharingEnabled && (
                        <p className="text-xs text-eco">Final price may reduce with co-passengers</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {sharingEnabled && (
                <div className="p-4 rounded-xl bg-eco/5 border border-eco/20">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-eco/10 flex items-center justify-center pulse-eco">
                      <Leaf className="h-5 w-5 text-eco" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Eco-Impact</p>
                      <p className="text-xs text-muted-foreground">Save ~1.2 kg CO₂ by sharing</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Payment Method</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 h-12 justify-start gap-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span>Wallet</span>
                    <span className="ml-auto text-xs text-muted-foreground">₹500</span>
                  </Button>
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <CreditCard className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button 
                className="w-full h-14 text-base gradient-primary hover:opacity-90" 
                size="lg"
                onClick={handleBookRide}
                disabled={!dropoffLocation}
              >
                {sharingEnabled ? "Book Shared Ride" : "Book Solo Ride"}
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
