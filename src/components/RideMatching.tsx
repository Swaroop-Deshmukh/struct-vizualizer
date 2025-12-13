import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Car, 
  MapPin, 
  Clock, 
  Star, 
  Phone, 
  MessageCircle,
  Navigation,
  Users,
  Leaf,
  X,
  Check,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Map from "@/components/Map";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface RideMatchingProps {
  pickupLocation: Location;
  dropoffLocation: Location;
  sharingEnabled: boolean;
  vehicleType: string;
  onCancel: () => void;
  onRideConfirmed: (ride: any) => void;
}

type MatchingStatus = "searching" | "driver_found" | "waiting_approval" | "confirmed" | "cancelled";

interface Driver {
  id: string;
  name: string;
  rating: number;
  trips: number;
  photo: string;
  vehicle: {
    make: string;
    model: string;
    color: string;
    plate: string;
  };
  eta: number;
  location: { lat: number; lng: number };
}

interface CoPassenger {
  id: string;
  name: string;
  rating: number;
  pickup: string;
  savings: string;
  detour: string;
}

export default function RideMatching({
  pickupLocation,
  dropoffLocation,
  sharingEnabled,
  vehicleType,
  onCancel,
  onRideConfirmed,
}: RideMatchingProps) {
  const [status, setStatus] = useState<MatchingStatus>("searching");
  const [progress, setProgress] = useState(0);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [pendingPassengers, setPendingPassengers] = useState<CoPassenger[]>([]);
  const [approvedPassengers, setApprovedPassengers] = useState<string[]>([]);
  const [driverLocation, setDriverLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Simulate driver search
  useEffect(() => {
    if (status !== "searching") return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          // Simulate finding a driver
          const mockDriver: Driver = {
            id: "driver-1",
            name: "Rajesh Kumar",
            rating: 4.8,
            trips: 1250,
            photo: "",
            vehicle: {
              make: "Maruti",
              model: "Swift Dzire",
              color: "White",
              plate: "MH 12 AB 1234",
            },
            eta: 5,
            location: {
              lat: pickupLocation.lat + 0.01,
              lng: pickupLocation.lng + 0.01,
            },
          };
          setDriver(mockDriver);
          setDriverLocation(mockDriver.location);
          setStatus("driver_found");
          
          toast({
            title: "Driver Found!",
            description: `${mockDriver.name} is on the way`,
          });

          return 100;
        }
        return p + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [status, pickupLocation]);

  // Simulate co-passenger requests when sharing is enabled
  useEffect(() => {
    if (status !== "driver_found" || !sharingEnabled) return;

    const timer = setTimeout(() => {
      setPendingPassengers([
        {
          id: "passenger-1",
          name: "Priya S.",
          rating: 4.7,
          pickup: "500m from your pickup",
          savings: "₹45 (25%)",
          detour: "3 min extra",
        },
      ]);
      setStatus("waiting_approval");
      
      toast({
        title: "Share Request!",
        description: "Someone wants to share your ride",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [status, sharingEnabled]);

  // Simulate driver movement
  useEffect(() => {
    if (!driver || status === "searching" || status === "cancelled") return;

    const interval = setInterval(() => {
      setDriverLocation((prev) => {
        if (!prev) return driver.location;
        
        const newLat = prev.lat + (pickupLocation.lat - prev.lat) * 0.1;
        const newLng = prev.lng + (pickupLocation.lng - prev.lng) * 0.1;
        
        return { lat: newLat, lng: newLng };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [driver, status, pickupLocation]);

  const handleApprovePassenger = (passengerId: string) => {
    setApprovedPassengers((prev) => [...prev, passengerId]);
    setPendingPassengers((prev) => prev.filter((p) => p.id !== passengerId));
    
    toast({
      title: "Co-passenger Approved",
      description: "They'll join at a nearby pickup point",
    });

    if (pendingPassengers.length === 1) {
      setStatus("confirmed");
      onRideConfirmed({
        driver,
        passengers: [...approvedPassengers, passengerId],
        sharingEnabled,
      });
    }
  };

  const handleRejectPassenger = (passengerId: string) => {
    setPendingPassengers((prev) => prev.filter((p) => p.id !== passengerId));
    
    toast({
      title: "Request Declined",
      description: "Looking for other passengers...",
    });

    if (pendingPassengers.length === 1) {
      setStatus("confirmed");
      onRideConfirmed({
        driver,
        passengers: approvedPassengers,
        sharingEnabled,
      });
    }
  };

  const handleConfirmRide = () => {
    setStatus("confirmed");
    onRideConfirmed({
      driver,
      passengers: approvedPassengers,
      sharingEnabled,
    });
  };

  const handleCancelRide = () => {
    setStatus("cancelled");
    onCancel();
  };

  return (
    <div className="space-y-6">
      {/* Map with real-time tracking */}
      <Card className="border-0 shadow-card overflow-hidden">
        <CardContent className="p-0">
          <Map
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            driverLocation={driverLocation}
            showRoute={status !== "searching"}
            className="h-[300px]"
          />
        </CardContent>
      </Card>

      {/* Status Card */}
      {status === "searching" && (
        <Card className="border-0 shadow-card">
          <CardContent className="p-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-full gradient-primary flex items-center justify-center mx-auto animate-pulse">
              <Car className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Finding your ride...</h3>
              <p className="text-sm text-muted-foreground">
                {sharingEnabled ? "Looking for drivers and potential co-passengers" : "Looking for available drivers"}
              </p>
            </div>
            <Progress value={progress} className="h-2" />
            <Button variant="outline" onClick={handleCancelRide}>
              Cancel Search
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Driver Found */}
      {(status === "driver_found" || status === "waiting_approval" || status === "confirmed") && driver && (
        <Card className="border-0 shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Your Driver</CardTitle>
              <Badge className="bg-eco/10 text-eco">
                <Clock className="h-3 w-3 mr-1" />
                {driver.eta} min away
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={driver.photo} alt={driver.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {driver.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{driver.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                    {driver.rating}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{driver.trips} trips</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3">
                <Car className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">
                    {driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model}
                  </p>
                  <p className="text-sm text-muted-foreground">{driver.vehicle.plate}</p>
                </div>
              </div>
            </div>

            {status === "driver_found" && !sharingEnabled && (
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleCancelRide}>
                  Cancel Ride
                </Button>
                <Button className="flex-1 gradient-primary" onClick={handleConfirmRide}>
                  Confirm Ride
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Consensus Sharing Approval */}
      {status === "waiting_approval" && pendingPassengers.length > 0 && (
        <Card className="border-2 border-sharing shadow-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-sharing" />
              <CardTitle className="text-lg">Share Request</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              As the Captain, you decide who joins your ride
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingPassengers.map((passenger) => (
              <div key={passenger.id} className="p-4 rounded-xl bg-sharing/5 border border-sharing/20 space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-sharing/10 text-sharing">
                      {passenger.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{passenger.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                        {passenger.rating}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{passenger.pickup}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-2 rounded-lg bg-eco/10 text-center">
                    <p className="text-xs text-muted-foreground">Your Savings</p>
                    <p className="font-semibold text-eco">{passenger.savings}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">Extra Time</p>
                    <p className="font-semibold">{passenger.detour}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => handleRejectPassenger(passenger.id)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Decline
                  </Button>
                  <Button 
                    className="flex-1 bg-sharing hover:bg-sharing/90"
                    onClick={() => handleApprovePassenger(passenger.id)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleConfirmRide}
            >
              Skip & Continue Solo
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Confirmed Ride */}
      {status === "confirmed" && (
        <Card className="border-2 border-eco shadow-card">
          <CardContent className="p-6 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-eco/10 flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-eco" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-eco">Ride Confirmed!</h3>
              <p className="text-sm text-muted-foreground">
                {driver?.name} is on the way to pick you up
              </p>
            </div>
            {approvedPassengers.length > 0 && (
              <div className="p-3 rounded-lg bg-eco/5 border border-eco/20">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Leaf className="h-4 w-4 text-eco" />
                  <span>Sharing with {approvedPassengers.length} co-passenger(s)</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Route Info */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-eco flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="h-2 w-2 bg-white rounded-full" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="text-sm font-medium">{pickupLocation.address}</p>
            </div>
          </div>
          <div className="ml-3 border-l-2 border-dashed border-border h-4" />
          <div className="flex items-start gap-3">
            <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="h-2 w-2 bg-white rounded-full" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Drop-off</p>
              <p className="text-sm font-medium">{dropoffLocation.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
