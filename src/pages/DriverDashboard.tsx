import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Route
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const pendingRequests = [
  {
    id: 1,
    passenger: { name: "Rahul M.", rating: 4.8, rides: 45, avatar: "" },
    pickup: "Connaught Place",
    dropoff: "Near your route",
    detour: "+5 min",
    extraEarning: "+₹85",
    distance: "2 km off-route",
    approvedByCaptain: true,
  },
  {
    id: 2,
    passenger: { name: "Sneha K.", rating: 4.9, rides: 120, avatar: "" },
    pickup: "Janpath",
    dropoff: "Cyber Hub (same)",
    detour: "+0 min",
    extraEarning: "+₹120",
    distance: "On route",
    approvedByCaptain: true,
  },
];

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const [driverMode, setDriverMode] = useState<"city" | "intercity">("city");

  const handleApprove = (id: number) => {
    toast({
      title: "✅ Passenger Approved",
      description: "They've been added to your ride. Adjust route as needed.",
    });
  };

  const handleReject = (id: number) => {
    toast({
      title: "Request Declined",
      description: "The passenger will be notified.",
    });
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-6">
      {/* Header with Status Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-display text-foreground">Driver Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your rides and earnings</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Mode Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-lg bg-secondary">
            <Button 
              size="sm" 
              variant={driverMode === "city" ? "default" : "ghost"}
              onClick={() => setDriverMode("city")}
              className={driverMode === "city" ? "gradient-primary" : ""}
            >
              City Mode
            </Button>
            <Button 
              size="sm" 
              variant={driverMode === "intercity" ? "default" : "ghost"}
              onClick={() => setDriverMode("intercity")}
              className={driverMode === "intercity" ? "gradient-primary" : ""}
            >
              Intercity
            </Button>
          </div>

          {/* Online Status */}
          <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
            isOnline ? 'border-eco bg-eco/5' : 'border-border bg-card'
          }`}>
            <div className={`h-3 w-3 rounded-full ${isOnline ? 'bg-eco animate-pulse' : 'bg-muted-foreground'}`} />
            <span className="font-medium text-foreground">{isOnline ? 'Online' : 'Offline'}</span>
            <Switch 
              checked={isOnline} 
              onCheckedChange={setIsOnline}
              className="data-[state=checked]:bg-eco"
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-eco/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-eco" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">₹2,840</p>
                <p className="text-xs text-muted-foreground">Today's earnings</p>
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
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">Rides today</p>
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
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-muted-foreground">Shared rides</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">+₹680</p>
                <p className="text-xs text-muted-foreground">Extra from shares</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Ride */}
      <Card className="border-2 border-primary bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              Current Ride
            </CardTitle>
            <Badge className="bg-sharing text-sharing-foreground">
              <Users className="h-3 w-3 mr-1" />
              2 passengers
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <div className="w-0.5 h-12 bg-border" />
              <MapPin className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Pickup - Passenger 1 (Captain)</p>
                <p className="font-medium text-foreground">Connaught Place</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Drop-off</p>
                <p className="font-medium text-foreground">Gurugram Cyber Hub</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">₹380</p>
              <p className="text-xs text-eco">+₹120 from shares</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Route className="h-4 w-4" />
              28 km remaining
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              ~35 min ETA
            </span>
          </div>

          <Button className="w-full" size="lg">
            <Navigation className="h-4 w-4 mr-2" />
            Navigate to Next Pickup
          </Button>
        </CardContent>
      </Card>

      {/* Pending Requests */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent" />
              Pending Join Requests
            </CardTitle>
            <Badge variant="secondary">{pendingRequests.length} new</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingRequests.map((request) => (
            <div key={request.id} className="p-4 rounded-xl border border-border bg-secondary/30">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.passenger.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {request.passenger.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{request.passenger.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ⭐ {request.passenger.rating} • {request.passenger.rides} rides
                    </p>
                  </div>
                </div>
                {request.approvedByCaptain && (
                  <Badge className="bg-eco/10 text-eco border-0">
                    <Check className="h-3 w-3 mr-1" />
                    Captain approved
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Pickup</p>
                  <p className="font-medium text-foreground">{request.pickup}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Drop-off</p>
                  <p className="font-medium text-foreground">{request.dropoff}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-card mb-4">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {request.detour}
                  </span>
                  <span className="text-muted-foreground">{request.distance}</span>
                </div>
                <span className="text-lg font-bold text-eco">{request.extraEarning}</span>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 gradient-primary hover:opacity-90"
                  onClick={() => handleApprove(request.id)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Accept
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleReject(request.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hotspot Map Placeholder */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Flame className="h-5 w-5 text-accent" />
            Demand Hotspots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 rounded-xl bg-secondary flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Map integration coming soon</p>
              <p className="text-sm">Shows high-demand areas in real-time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
