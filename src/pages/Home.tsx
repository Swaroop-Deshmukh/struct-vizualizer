import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Car, 
  MapPin, 
  Users, 
  Leaf, 
  Wallet, 
  ArrowRight, 
  TrendingUp,
  Clock,
  Navigation
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [sharingEnabled, setSharingEnabled] = useState(true);

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold font-display text-foreground">
            Welcome back, <span className="text-gradient-primary">John</span>
          </h1>
          <p className="text-muted-foreground mt-1">Ready for your next ride?</p>
        </div>
        
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${sharingEnabled ? 'gradient-sharing' : 'bg-muted'}`}>
              <Users className={`h-5 w-5 ${sharingEnabled ? 'text-sharing-foreground' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Sharing Mode</p>
              <p className="text-xs text-muted-foreground">
                {sharingEnabled ? 'Save up to 40%' : 'Solo rides only'}
              </p>
            </div>
          </div>
          <Switch 
            checked={sharingEnabled} 
            onCheckedChange={setSharingEnabled}
            className="data-[state=checked]:bg-sharing"
          />
        </div>
      </div>

      {/* Quick Book Card */}
      <Card className="overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-shadow">
        <div className="gradient-primary p-6 text-primary-foreground">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold font-display">Quick Book</h2>
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
              <Clock className="h-3 w-3 mr-1" />
              ~3 min pickup
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/10">
              <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Navigation className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs opacity-80">Pickup</p>
                <p className="text-sm font-medium">Current Location</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary-foreground/10">
              <div className="h-8 w-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs opacity-80">Drop-off</p>
                <p className="text-sm font-medium text-primary-foreground/60">Where to?</p>
              </div>
            </div>
          </div>
          
          <Link to="/book">
            <Button className="w-full mt-4 bg-primary-foreground text-primary hover:bg-primary-foreground/90" size="lg">
              Book Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-eco/10 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-eco" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12.5</p>
                <p className="text-xs text-muted-foreground">kg CO₂ saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">28</p>
                <p className="text-xs text-muted-foreground">Shared rides</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">₹2,450</p>
                <p className="text-xs text-muted-foreground">Total saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-info/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-info" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.9</p>
                <p className="text-xs text-muted-foreground">Your rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Shares Nearby */}
      <Card className="border-0 shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display">Available Shares Nearby</CardTitle>
            <Link to="/shares">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { 
              from: "Connaught Place", 
              to: "Gurugram Cyber Hub", 
              passengers: 2, 
              seats: 2, 
              price: "₹180", 
              savings: "32%",
              eta: "5 min"
            },
            { 
              from: "Nehru Place", 
              to: "Noida Sector 62", 
              passengers: 1, 
              seats: 3, 
              price: "₹120", 
              savings: "25%",
              eta: "8 min"
            },
            { 
              from: "Rajiv Chowk", 
              to: "DLF Phase 3", 
              passengers: 3, 
              seats: 1, 
              price: "₹210", 
              savings: "40%",
              eta: "3 min"
            },
          ].map((ride, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl gradient-sharing flex items-center justify-center">
                  <Car className="h-6 w-6 text-sharing-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{ride.from}</p>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <p className="font-medium text-foreground">{ride.to}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {ride.passengers}/{ride.passengers + ride.seats} passengers
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ride.eta} away
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{ride.price}</p>
                <Badge className="bg-eco/10 text-eco border-0 text-xs">
                  Save {ride.savings}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Rides */}
      <Card className="border-0 shadow-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display">Recent Rides</CardTitle>
            <Link to="/history">
              <Button variant="ghost" size="sm" className="text-primary">
                View History
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { 
              from: "Home", 
              to: "Office", 
              date: "Today, 9:15 AM", 
              price: "₹145", 
              type: "Shared",
              coPassengers: 2
            },
            { 
              from: "Office", 
              to: "Cyber Hub", 
              date: "Yesterday, 7:30 PM", 
              price: "₹280", 
              type: "Solo",
              coPassengers: 0
            },
          ].map((ride, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${ride.type === 'Shared' ? 'bg-sharing/10' : 'bg-muted'}`}>
                  <Car className={`h-5 w-5 ${ride.type === 'Shared' ? 'text-sharing' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{ride.from}</p>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <p className="font-medium text-foreground">{ride.to}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{ride.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{ride.price}</p>
                <Badge variant={ride.type === 'Shared' ? 'default' : 'secondary'} className={`text-xs ${ride.type === 'Shared' ? 'bg-sharing text-sharing-foreground' : ''}`}>
                  {ride.type}
                  {ride.coPassengers > 0 && ` (+${ride.coPassengers})`}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
