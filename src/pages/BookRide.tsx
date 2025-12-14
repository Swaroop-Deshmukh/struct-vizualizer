import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Minus,
  Plus,
  Wallet,
  CreditCard,
  Crosshair,
  ArrowLeft
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Map from "@/components/Map";
import RideMatching from "@/components/RideMatching";
import { LocationSearch } from "@/components/LocationSearch";

const vehicleTypes = [
  { 
    id: "hatchback", 
    name: "Hatchback", 
    price: 120, 
    time: "3 min", 
    seats: 3,
    description: "Economical & compact"
  },
  { 
    id: "sedan", 
    name: "Sedan", 
    price: 180, 
    time: "5 min", 
    seats: 4,
    description: "Comfortable ride"
  },
  { 
    id: "suv", 
    name: "SUV", 
    price: 250, 
    time: "7 min", 
    seats: 6,
    description: "Spacious & premium"
  },
];

interface Location {
  lat: number;
  lng: number;
  address: string;
}

export default function BookRide() {
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [sharingEnabled, setSharingEnabled] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState("sedan");
  const [maxPassengers, setMaxPassengers] = useState(2);
  const [selectMode, setSelectMode] = useState<"pickup" | "dropoff" | null>(null);
  const [pickupInput, setPickupInput] = useState("");
  const [dropoffInput, setDropoffInput] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const handlePickupSelect = (location: Location) => {
    setPickupLocation(location);
    setPickupInput(location.address);
    setSelectMode(null);
    toast({
      title: "Pickup location set",
      description: location.address.substring(0, 50) + (location.address.length > 50 ? "..." : ""),
    });
  };

  const handleDropoffSelect = (location: Location) => {
    setDropoffLocation(location);
    setDropoffInput(location.address);
    setSelectMode(null);
    toast({
      title: "Drop-off location set",
      description: location.address.substring(0, 50) + (location.address.length > 50 ? "..." : ""),
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
            handlePickupSelect({ lat: latitude, lng: longitude, address });
          } catch {
            handlePickupSelect({ lat: latitude, lng: longitude, address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` });
          }
        },
        () => {
          toast({
            title: "Location error",
            description: "Could not get your current location",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleBookRide = () => {
    if (!pickupLocation || !dropoffLocation) {
      toast({
        title: "Missing locations",
        description: "Please select both pickup and drop-off locations",
        variant: "destructive",
      });
      return;
    }
    setIsBooking(true);
  };

  const handleCancelBooking = () => {
    setIsBooking(false);
  };

  const handleRideConfirmed = (ride: any) => {
    toast({
      title: "Ride Confirmed!",
      description: "Your driver is on the way",
    });
  };

  const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);
  const estimatedDistance = pickupLocation && dropoffLocation ? 
    Math.round(
      Math.sqrt(
        Math.pow((dropoffLocation.lat - pickupLocation.lat) * 111, 2) +
        Math.pow((dropoffLocation.lng - pickupLocation.lng) * 111 * Math.cos(pickupLocation.lat * Math.PI / 180), 2)
      )
    ) : 0;
  const estimatedFare = selectedVehicleData ? selectedVehicleData.price + (estimatedDistance * 10) : 0;
  const estimatedTime = Math.round(estimatedDistance * 2.5);

  // Show ride matching when booking
  if (isBooking && pickupLocation && dropoffLocation) {
    return (
      <div className="min-h-screen p-6 lg:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleCancelBooking}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-display text-foreground">Finding Your Ride</h1>
            <p className="text-muted-foreground mt-1">
              {sharingEnabled ? "Looking for drivers and co-passengers" : "Looking for available drivers"}
            </p>
          </div>
        </div>

        <RideMatching
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          sharingEnabled={sharingEnabled}
          vehicleType={selectedVehicle}
          onCancel={handleCancelBooking}
          onRideConfirmed={handleRideConfirmed}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-foreground">Book a Ride</h1>
        <p className="text-muted-foreground mt-1">Select locations on the map or enter addresses</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Map & Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Map */}
          <Card className="border-0 shadow-card overflow-hidden">
            <CardContent className="p-0">
              <Map
                pickupLocation={pickupLocation}
                dropoffLocation={dropoffLocation}
                onPickupSelect={handlePickupSelect}
                onDropoffSelect={handleDropoffSelect}
                selectMode={selectMode}
                showRoute={!!(pickupLocation && dropoffLocation)}
                className="h-[400px]"
              />
            </CardContent>
          </Card>

          {/* Location Input */}
          <Card className="border-0 shadow-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <LocationSearch
                    value={pickupInput}
                    onChange={setPickupInput}
                    onSelect={(location) => handlePickupSelect({ lat: location.lat, lng: location.lng, address: location.address })}
                    placeholder="Search pickup location..."
                    icon={<div className="h-3 w-3 rounded-full bg-eco" />}
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={getCurrentLocation}
                  className="h-14 w-14 text-primary"
                  title="Use current location"
                >
                  <Navigation className="h-5 w-5" />
                </Button>
                <Button 
                  variant={selectMode === "pickup" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setSelectMode(selectMode === "pickup" ? null : "pickup")}
                  className={`h-14 w-14 ${selectMode === "pickup" ? "gradient-primary text-primary-foreground" : "text-primary"}`}
                  title="Select on map"
                >
                  <Crosshair className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 pl-5">
                <div className="w-0.5 h-8 bg-border" />
              </div>
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <LocationSearch
                    value={dropoffInput}
                    onChange={setDropoffInput}
                    onSelect={(location) => handleDropoffSelect({ lat: location.lat, lng: location.lng, address: location.address })}
                    placeholder="Search drop-off location..."
                    icon={<MapPin className="h-4 w-4 text-accent" />}
                  />
                </div>
                <Button 
                  variant={selectMode === "dropoff" ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setSelectMode(selectMode === "dropoff" ? null : "dropoff")}
                  className={`h-14 w-14 ${selectMode === "dropoff" ? "bg-accent text-accent-foreground" : "text-accent"}`}
                  title="Select on map"
                >
                  <Crosshair className="h-5 w-5" />
                </Button>
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
                        <p className="font-bold text-foreground">₹{vehicle.price}</p>
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
                  <span className="font-medium">₹{selectedVehicleData?.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Distance (est.)</span>
                  <span className="font-medium">~{estimatedDistance || "--"} km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time (est.)</span>
                  <span className="font-medium">~{estimatedTime || "--"} min</span>
                </div>
                
                {sharingEnabled && estimatedFare > 0 && (
                  <div className="flex justify-between text-sm text-eco">
                    <span className="flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      Sharing discount
                    </span>
                    <span className="font-medium">-Up to 40%</span>
                  </div>
                )}
                
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">
                        {estimatedFare > 0 ? `₹${estimatedFare}` : "--"}
                      </p>
                      {sharingEnabled && estimatedFare > 0 && (
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
                      <p className="text-xs text-muted-foreground">
                        Save ~{Math.round(estimatedDistance * 0.14 * 10) / 10 || "--"} kg CO₂ by sharing
                      </p>
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
                disabled={!pickupLocation || !dropoffLocation}
              >
                {sharingEnabled ? "Book Shared Ride" : "Book Solo Ride"}
                <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
