import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Car, 
  MapPin, 
  Users, 
  Navigation,
  Clock,
  DollarSign,
  TrendingUp,
  Check,
  X,
  Bell,
  Flame,
  Route,
  Phone,
  MessageSquare,
  Shield,
  Star,
  Zap,
  Target,
  ChevronRight,
  Play,
  Square,
  AlertCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Map from "@/components/Map";

interface RideRequest {
  id: string;
  passenger: { 
    name: string; 
    rating: number; 
    rides: number; 
    avatar: string;
    phone: string;
  };
  pickup: string;
  pickupCoords: { lat: number; lng: number };
  dropoff: string;
  dropoffCoords: { lat: number; lng: number };
  distance: string;
  duration: string;
  fare: number;
  isShared: boolean;
  detour?: string;
  extraEarning?: number;
  approvedByCaptain?: boolean;
}

const mockRideRequests: RideRequest[] = [
  {
    id: "1",
    passenger: { name: "Rahul Mehta", rating: 4.8, rides: 45, avatar: "", phone: "+91 98765 43210" },
    pickup: "Connaught Place, Delhi",
    pickupCoords: { lat: 28.6315, lng: 77.2167 },
    dropoff: "Cyber Hub, Gurugram",
    dropoffCoords: { lat: 28.4950, lng: 77.0895 },
    distance: "28 km",
    duration: "45 min",
    fare: 420,
    isShared: false,
  },
  {
    id: "2",
    passenger: { name: "Sneha Kapoor", rating: 4.9, rides: 120, avatar: "", phone: "+91 87654 32109" },
    pickup: "Janpath, Delhi",
    pickupCoords: { lat: 28.6234, lng: 77.2190 },
    dropoff: "Cyber Hub, Gurugram",
    dropoffCoords: { lat: 28.4950, lng: 77.0895 },
    distance: "2 km off-route",
    duration: "+5 min",
    fare: 85,
    isShared: true,
    detour: "+5 min",
    extraEarning: 85,
    approvedByCaptain: true,
  },
];

export default function DriverDashboard() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [driverMode, setDriverMode] = useState<"city" | "intercity">("city");
  const [currentRide, setCurrentRide] = useState<RideRequest | null>(null);
  const [rideStatus, setRideStatus] = useState<"idle" | "arriving" | "waiting" | "in_progress" | "completing">("idle");
  const [pendingRequests, setPendingRequests] = useState<RideRequest[]>([]);
  const [newRequest, setNewRequest] = useState<RideRequest | null>(null);
  const [countdown, setCountdown] = useState(15);

  // Simulate incoming ride request
  useEffect(() => {
    if (isOnline && !currentRide && !newRequest) {
      const timer = setTimeout(() => {
        setNewRequest(mockRideRequests[0]);
        setCountdown(15);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, currentRide, newRequest]);

  // Countdown timer for ride request
  useEffect(() => {
    if (newRequest && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && newRequest) {
      setNewRequest(null);
      toast({ title: "Request expired", description: "Ride request timed out" });
    }
  }, [countdown, newRequest]);

  const handleAcceptRide = () => {
    if (newRequest) {
      setCurrentRide(newRequest);
      setRideStatus("arriving");
      setNewRequest(null);
      toast({ title: "Ride accepted!", description: "Navigate to pickup location" });
      
      // Add a pending share request after 5 seconds
      setTimeout(() => {
        setPendingRequests([mockRideRequests[1]]);
      }, 5000);
    }
  };

  const handleDeclineRide = () => {
    setNewRequest(null);
    toast({ title: "Request declined", description: "Looking for more rides..." });
  };

  const handleArrivedAtPickup = () => {
    setRideStatus("waiting");
    toast({ title: "Marked as arrived", description: "Waiting for passenger..." });
  };

  const handleStartRide = () => {
    setRideStatus("in_progress");
    toast({ title: "Ride started!", description: "Drive safely to destination" });
  };

  const handleCompleteRide = () => {
    setRideStatus("completing");
    setTimeout(() => {
      setCurrentRide(null);
      setRideStatus("idle");
      setPendingRequests([]);
      toast({ 
        title: "Ride completed! 🎉", 
        description: `You earned ₹${currentRide?.fare || 0}`
      });
    }, 2000);
  };

  const handleApproveShare = (id: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
    toast({
      title: "✅ Passenger added",
      description: "Route updated with new pickup",
    });
  };

  const handleRejectShare = (id: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
    toast({ title: "Request declined" });
  };

  const displayName = user?.user_metadata?.full_name || "Driver";
  const driverLocation = { lat: 28.6139, lng: 77.2090 };

  return (
    <div className="min-h-screen bg-background">
      {/* Incoming Ride Request Overlay */}
      {newRequest && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end justify-center p-4 animate-in slide-in-from-bottom">
          <Card className="w-full max-w-md border-2 border-primary animate-pulse-glow">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                    <Car className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">New Ride Request</p>
                    <p className="text-sm text-muted-foreground">{newRequest.distance} • {newRequest.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-eco">₹{newRequest.fare}</p>
                  <div className="h-2 w-16 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-1000" 
                      style={{ width: `${(countdown / 15) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-secondary/50 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-3 w-3 rounded-full bg-primary mt-1" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="font-medium text-foreground">{newRequest.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Drop-off</p>
                    <p className="font-medium text-foreground">{newRequest.dropoff}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {newRequest.passenger.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{newRequest.passenger.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ⭐ {newRequest.passenger.rating} • {newRequest.passenger.rides} rides
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14"
                  onClick={handleDeclineRide}
                >
                  <X className="h-5 w-5 mr-2" />
                  Decline
                </Button>
                <Button 
                  size="lg" 
                  className="h-14 gradient-primary hover:opacity-90"
                  onClick={handleAcceptRide}
                >
                  <Check className="h-5 w-5 mr-2" />
                  Accept ({countdown}s)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="p-4 lg:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold font-display text-foreground">
              {currentRide ? "Active Ride" : `Hello, ${displayName.split(' ')[0]}`}
            </h1>
            <p className="text-sm text-muted-foreground">
              {currentRide ? `En route to ${rideStatus === "arriving" ? "pickup" : "destination"}` : "Ready to earn?"}
            </p>
          </div>
          
          {!currentRide && (
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full border-2 transition-all ${
              isOnline ? 'border-eco bg-eco/10' : 'border-muted bg-muted/20'
            }`}>
              <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-eco animate-pulse' : 'bg-muted-foreground'}`} />
              <span className="font-medium text-sm">{isOnline ? 'Online' : 'Offline'}</span>
              <Switch 
                checked={isOnline} 
                onCheckedChange={setIsOnline}
                className="data-[state=checked]:bg-eco"
              />
            </div>
          )}
        </div>

        {/* Mode Toggle - Only when no active ride */}
        {!currentRide && isOnline && (
          <div className="flex items-center gap-2 p-1 rounded-xl bg-secondary w-fit">
            <Button 
              size="sm" 
              variant={driverMode === "city" ? "default" : "ghost"}
              onClick={() => setDriverMode("city")}
              className={driverMode === "city" ? "gradient-primary" : ""}
            >
              <Zap className="h-4 w-4 mr-1" />
              City Mode
            </Button>
            <Button 
              size="sm" 
              variant={driverMode === "intercity" ? "default" : "ghost"}
              onClick={() => setDriverMode("intercity")}
              className={driverMode === "intercity" ? "gradient-primary" : ""}
            >
              <Route className="h-4 w-4 mr-1" />
              Intercity
            </Button>
          </div>
        )}

        {/* Map View */}
        <Card className="border-0 shadow-card overflow-hidden">
          <div className="h-[300px] lg:h-[400px]">
            <Map
              pickupLocation={currentRide?.pickupCoords || driverLocation}
              dropoffLocation={currentRide?.dropoffCoords}
              showRoute={!!currentRide}
              driverLocation={driverLocation}
              className="h-full w-full"
            />
          </div>
        </Card>

        {/* Active Ride Panel */}
        {currentRide && (
          <Card className="border-2 border-primary">
            <CardContent className="p-4 space-y-4">
              {/* Ride Progress */}
              <div className="flex items-center gap-2 text-sm">
                {["arriving", "waiting", "in_progress", "completing"].map((status, i) => (
                  <div key={status} className="flex items-center gap-2 flex-1">
                    <div className={`h-2 flex-1 rounded-full ${
                      ["arriving", "waiting", "in_progress", "completing"].indexOf(rideStatus) >= i 
                        ? "bg-primary" 
                        : "bg-secondary"
                    }`} />
                  </div>
                ))}
              </div>

              {/* Passenger Info */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {currentRide.passenger.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{currentRide.passenger.name}</p>
                    <p className="text-sm text-muted-foreground">⭐ {currentRide.passenger.rating}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline" className="h-10 w-10 rounded-full">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="h-10 w-10 rounded-full">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Location Details */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-card">
                <div className="flex flex-col items-center">
                  <div className={`h-3 w-3 rounded-full ${rideStatus === "arriving" ? "bg-primary animate-pulse" : "bg-eco"}`} />
                  <div className="w-0.5 h-8 bg-border" />
                  <MapPin className={`h-4 w-4 ${rideStatus === "in_progress" ? "text-primary animate-pulse" : "text-accent"}`} />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="font-medium text-foreground text-sm">{currentRide.pickup}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Drop-off</p>
                    <p className="font-medium text-foreground text-sm">{currentRide.dropoff}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-foreground">₹{currentRide.fare}</p>
                  <p className="text-xs text-muted-foreground">{currentRide.distance}</p>
                </div>
              </div>

              {/* Action Buttons */}
              {rideStatus === "arriving" && (
                <Button 
                  size="lg" 
                  className="w-full gradient-primary hover:opacity-90"
                  onClick={handleArrivedAtPickup}
                >
                  <Navigation className="h-5 w-5 mr-2" />
                  I've Arrived at Pickup
                </Button>
              )}
              {rideStatus === "waiting" && (
                <Button 
                  size="lg" 
                  className="w-full bg-eco hover:bg-eco/90 text-eco-foreground"
                  onClick={handleStartRide}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Ride
                </Button>
              )}
              {rideStatus === "in_progress" && (
                <Button 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={handleCompleteRide}
                >
                  <Square className="h-5 w-5 mr-2" />
                  Complete Ride
                </Button>
              )}
              {rideStatus === "completing" && (
                <div className="text-center py-4">
                  <div className="h-12 w-12 rounded-full bg-eco/20 flex items-center justify-center mx-auto mb-2 animate-pulse">
                    <Check className="h-6 w-6 text-eco" />
                  </div>
                  <p className="font-semibold text-foreground">Completing ride...</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Pending Share Requests */}
        {pendingRequests.length > 0 && currentRide && (
          <Card className="border-accent border-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                <CardTitle className="text-base">Share Request</CardTitle>
                <Badge className="bg-accent/20 text-accent border-0">+₹{pendingRequests[0].extraEarning}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="p-3 rounded-xl bg-secondary/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {request.passenger.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-foreground">{request.passenger.name}</p>
                        <p className="text-xs text-muted-foreground">⭐ {request.passenger.rating}</p>
                      </div>
                    </div>
                    {request.approvedByCaptain && (
                      <Badge variant="outline" className="bg-eco/10 text-eco border-eco/30 text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Captain OK
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted-foreground">{request.distance}</span>
                    <span className="text-muted-foreground">{request.detour} detour</span>
                    <span className="font-bold text-eco">+₹{request.extraEarning}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRejectShare(request.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                    <Button 
                      size="sm" 
                      className="gradient-primary"
                      onClick={() => handleApproveShare(request.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Stats Grid - Only when not on a ride */}
        {!currentRide && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-eco/10 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-eco" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">₹2,840</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Car className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">Rides</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sharing/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-sharing" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">8</p>
                    <p className="text-xs text-muted-foreground">Shared</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">4.92</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Daily Goal Progress */}
        {!currentRide && isOnline && (
          <Card className="border-0 shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Daily Goal</span>
                </div>
                <span className="text-sm text-muted-foreground">₹2,840 / ₹5,000</span>
              </div>
              <Progress value={56.8} className="h-3" />
              <p className="text-xs text-muted-foreground mt-2">Complete 3 more rides to earn ₹150 bonus!</p>
            </CardContent>
          </Card>
        )}

        {/* Offline State */}
        {!isOnline && !currentRide && (
          <Card className="border-0 shadow-card">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">You're Offline</h3>
              <p className="text-sm text-muted-foreground mb-4">Go online to start receiving ride requests</p>
              <Button 
                size="lg" 
                className="gradient-primary hover:opacity-90"
                onClick={() => setIsOnline(true)}
              >
                <Zap className="h-5 w-5 mr-2" />
                Go Online
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Hotspots */}
        {!currentRide && isOnline && (
          <Card className="border-0 shadow-card">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-accent" />
                <CardTitle className="text-base">Nearby Hotspots</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { area: "Connaught Place", demand: "High", surge: "1.5x", distance: "2 km" },
                { area: "India Gate", demand: "Medium", surge: "1.2x", distance: "3.5 km" },
                { area: "Saket Mall", demand: "High", surge: "1.8x", distance: "8 km" },
              ].map((spot, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${spot.demand === "High" ? "bg-accent" : "bg-eco"}`} />
                    <div>
                      <p className="font-medium text-sm text-foreground">{spot.area}</p>
                      <p className="text-xs text-muted-foreground">{spot.distance} away</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className={spot.demand === "High" ? "bg-accent/10 text-accent" : ""}>
                    {spot.surge}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}