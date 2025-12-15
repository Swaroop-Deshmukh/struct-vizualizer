import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Car, 
  MapPin, 
  Users, 
  Clock,
  DollarSign,
  ChevronRight,
  Calendar,
  Star,
  Route,
  Leaf,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

interface RideHistory {
  id: string;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  distance: string;
  duration: string;
  fare: number;
  tip: number;
  passengers: number;
  isShared: boolean;
  sharedBonus: number;
  rating: number;
  status: "completed" | "cancelled" | "disputed";
  carbonSaved: number;
}

const mockRides: RideHistory[] = [
  {
    id: "1",
    date: "Today",
    time: "2:30 PM",
    pickup: "Connaught Place",
    dropoff: "Cyber Hub, Gurugram",
    distance: "28 km",
    duration: "45 min",
    fare: 420,
    tip: 50,
    passengers: 3,
    isShared: true,
    sharedBonus: 180,
    rating: 5,
    status: "completed",
    carbonSaved: 2.8,
  },
  {
    id: "2",
    date: "Today",
    time: "11:15 AM",
    pickup: "Rajouri Garden",
    dropoff: "Nehru Place",
    distance: "15 km",
    duration: "35 min",
    fare: 280,
    tip: 0,
    passengers: 1,
    isShared: false,
    sharedBonus: 0,
    rating: 4,
    status: "completed",
    carbonSaved: 0,
  },
  {
    id: "3",
    date: "Today",
    time: "9:00 AM",
    pickup: "Dwarka Sector 21",
    dropoff: "Aerocity",
    distance: "12 km",
    duration: "25 min",
    fare: 220,
    tip: 30,
    passengers: 2,
    isShared: true,
    sharedBonus: 85,
    rating: 5,
    status: "completed",
    carbonSaved: 1.2,
  },
  {
    id: "4",
    date: "Yesterday",
    time: "6:45 PM",
    pickup: "Hauz Khas Village",
    dropoff: "Saket",
    distance: "5 km",
    duration: "15 min",
    fare: 0,
    tip: 0,
    passengers: 1,
    isShared: false,
    sharedBonus: 0,
    rating: 0,
    status: "cancelled",
    carbonSaved: 0,
  },
  {
    id: "5",
    date: "Yesterday",
    time: "3:20 PM",
    pickup: "India Gate",
    dropoff: "Noida Sector 18",
    distance: "18 km",
    duration: "40 min",
    fare: 320,
    tip: 40,
    passengers: 2,
    isShared: true,
    sharedBonus: 120,
    rating: 5,
    status: "completed",
    carbonSaved: 1.8,
  },
];

export default function DriverRides() {
  const [selectedTab, setSelectedTab] = useState("all");
  
  const filteredRides = mockRides.filter(ride => {
    if (selectedTab === "all") return true;
    if (selectedTab === "shared") return ride.isShared;
    if (selectedTab === "solo") return !ride.isShared;
    return true;
  });

  const totalEarnings = filteredRides.reduce((acc, r) => acc + r.fare + r.tip + r.sharedBonus, 0);
  const totalRides = filteredRides.filter(r => r.status === "completed").length;
  const avgRating = filteredRides.filter(r => r.rating > 0).reduce((acc, r, _, arr) => acc + r.rating / arr.length, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-eco" />;
      case "cancelled": return <XCircle className="h-4 w-4 text-destructive" />;
      case "disputed": return <AlertCircle className="h-4 w-4 text-accent" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-foreground">Ride History</h1>
        <p className="text-muted-foreground mt-1">View your past rides and earnings</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">₹{totalEarnings.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Earned</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{totalRides}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4" onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Rides</TabsTrigger>
          <TabsTrigger value="shared">
            <Users className="h-4 w-4 mr-1" />
            Shared
          </TabsTrigger>
          <TabsTrigger value="solo">Solo</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-3">
          {filteredRides.length === 0 ? (
            <Card className="border-0 shadow-card">
              <CardContent className="p-8 text-center">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No rides found</p>
              </CardContent>
            </Card>
          ) : (
            filteredRides.map((ride, index) => (
              <div key={ride.id}>
                {/* Date Header */}
                {index === 0 || ride.date !== filteredRides[index - 1].date ? (
                  <div className="flex items-center gap-2 py-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">{ride.date}</span>
                  </div>
                ) : null}

                <Card className="border-0 shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{ride.time}</span>
                        {getStatusIcon(ride.status)}
                        {ride.isShared && (
                          <Badge className="bg-sharing/10 text-sharing border-0 text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {ride.passengers} passengers
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        {ride.status === "completed" ? (
                          <>
                            <p className="font-bold text-foreground">₹{ride.fare + ride.tip + ride.sharedBonus}</p>
                            {ride.sharedBonus > 0 && (
                              <p className="text-xs text-eco">+₹{ride.sharedBonus} shared</p>
                            )}
                          </>
                        ) : (
                          <Badge variant="outline" className="text-destructive border-destructive">
                            Cancelled
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <div className="w-0.5 h-6 bg-border" />
                        <MapPin className="h-3 w-3 text-accent" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-sm font-medium text-foreground">{ride.pickup}</p>
                        <p className="text-sm text-muted-foreground">{ride.dropoff}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Route className="h-3 w-3" />
                        {ride.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {ride.duration}
                      </span>
                      {ride.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-accent" />
                          {ride.rating}.0
                        </span>
                      )}
                      {ride.carbonSaved > 0 && (
                        <span className="flex items-center gap-1 text-eco">
                          <Leaf className="h-3 w-3" />
                          {ride.carbonSaved} kg
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}