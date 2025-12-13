import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Search, 
  Car, 
  Users, 
  Clock, 
  Leaf,
  Star,
  Shield,
  ArrowRight,
  Filter,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const availableShares = [
  {
    id: 1,
    captain: { name: "Priya Sharma", rating: 4.9, rides: 156, verified: true, avatar: "" },
    from: "Connaught Place",
    to: "Gurugram Cyber Hub",
    currentPassengers: 2,
    maxPassengers: 4,
    price: "₹180",
    originalPrice: "₹280",
    savings: "36%",
    eta: "5 min",
    departureTime: "Now",
    distance: "28 km",
    duration: "45 min",
    carbonSaved: "1.8 kg",
    vehicleType: "Sedan",
  },
  {
    id: 2,
    captain: { name: "Amit Kumar", rating: 4.7, rides: 89, verified: true, avatar: "" },
    from: "Nehru Place",
    to: "Noida Sector 62",
    currentPassengers: 1,
    maxPassengers: 3,
    price: "₹120",
    originalPrice: "₹160",
    savings: "25%",
    eta: "8 min",
    departureTime: "In 10 min",
    distance: "18 km",
    duration: "30 min",
    carbonSaved: "1.2 kg",
    vehicleType: "Hatchback",
  },
  {
    id: 3,
    captain: { name: "Neha Gupta", rating: 5.0, rides: 234, verified: true, avatar: "" },
    from: "Rajiv Chowk",
    to: "DLF Phase 3",
    currentPassengers: 3,
    maxPassengers: 4,
    price: "₹210",
    originalPrice: "₹350",
    savings: "40%",
    eta: "3 min",
    departureTime: "Now",
    distance: "32 km",
    duration: "55 min",
    carbonSaved: "2.1 kg",
    vehicleType: "SUV",
  },
];

export default function FindShares() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const handleJoinRide = (rideId: number) => {
    toast({
      title: "🎉 Request Sent!",
      description: "Waiting for captain and driver approval...",
    });
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-foreground">Find Shares</h1>
        <p className="text-muted-foreground mt-1">Join existing rides and save together</p>
      </div>

      {/* Search & Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-secondary/50 border-0"
                placeholder="Search by destination..."
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter("all")}>All Rides</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("nearby")}>Nearby Pickup</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("soon")}>Leaving Soon</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("eco")}>Max Eco Impact</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="h-12 gradient-primary hover:opacity-90">
                <MapPin className="h-4 w-4 mr-2" />
                Near Me
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-eco/5 border border-eco/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-eco/10 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-eco" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Join a Share, Save the Planet</p>
            <p className="text-xs text-muted-foreground">Each shared ride saves ~1.4 kg of CO₂</p>
          </div>
        </div>
        <Badge className="bg-eco text-eco-foreground">
          {availableShares.length} rides available
        </Badge>
      </div>

      {/* Available Shares List */}
      <div className="space-y-4">
        {availableShares.map((ride) => (
          <Card key={ride.id} className="border-0 shadow-card hover:shadow-card-hover transition-all overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Main Content */}
                <div className="flex-1 p-6">
                  {/* Captain Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={ride.captain.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {ride.captain.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">{ride.captain.name}</p>
                          {ride.captain.verified && (
                            <Shield className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span>{ride.captain.rating}</span>
                          <span>•</span>
                          <span>{ride.captain.rides} rides</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-muted-foreground">
                      {ride.vehicleType}
                    </Badge>
                  </div>

                  {/* Route Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center mt-1">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <div className="w-0.5 h-8 bg-border" />
                        <MapPin className="h-4 w-4 text-accent" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Pickup</p>
                          <p className="font-medium text-foreground">{ride.from}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Drop-off</p>
                          <p className="font-medium text-foreground">{ride.to}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{ride.currentPassengers}/{ride.maxPassengers} passengers</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{ride.departureTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-eco">
                      <Leaf className="h-4 w-4" />
                      <span>{ride.carbonSaved} CO₂</span>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Pricing & Action */}
                <div className="lg:w-64 p-6 bg-secondary/30 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-border">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-2xl font-bold text-foreground">{ride.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{ride.originalPrice}</span>
                    </div>
                    <Badge className="bg-eco/10 text-eco border-0 mb-4">
                      Save {ride.savings}
                    </Badge>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Distance</span>
                        <span className="font-medium text-foreground">{ride.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span className="font-medium text-foreground">{ride.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ETA to pickup</span>
                        <span className="font-medium text-foreground">{ride.eta}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 gradient-sharing hover:opacity-90"
                    onClick={() => handleJoinRide(ride.id)}
                  >
                    Join Ride
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
