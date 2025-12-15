import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Car, 
  Star,
  Shield,
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Edit,
  ChevronRight,
  Leaf,
  DollarSign,
  Users,
  CheckCircle,
  Camera,
  FileText,
  CreditCard
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function DriverProfile() {
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [shareRidesEnabled, setShareRidesEnabled] = useState(true);

  const displayName = user?.user_metadata?.full_name || "Driver";
  const email = user?.email || "";
  const phone = user?.user_metadata?.phone || "+91 XXXXX XXXXX";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  const stats = {
    totalRides: 1245,
    rating: 4.92,
    yearsActive: 2,
    acceptanceRate: 95,
    completionRate: 98,
    sharedRides: 420,
    carbonSaved: 156.8,
    totalEarnings: 485000,
  };

  const achievements = [
    { title: "Green Crusader", description: "Saved 100+ kg CO₂", icon: Leaf, color: "text-eco" },
    { title: "Sharing Champion", description: "100+ shared rides", icon: Users, color: "text-sharing" },
    { title: "Top Rated", description: "4.9+ rating", icon: Star, color: "text-accent" },
    { title: "Verified Driver", description: "All docs verified", icon: Shield, color: "text-primary" },
  ];

  const vehicle = {
    make: "Maruti Suzuki",
    model: "Dzire",
    year: 2022,
    color: "White",
    plate: "DL 01 AB 1234",
    type: "Sedan",
  };

  return (
    <div className="min-h-screen p-4 lg:p-6 space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-card overflow-hidden">
        <div className="h-24 gradient-primary" />
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-12">
            <div className="flex items-end gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src="" alt={displayName} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="pb-2">
                <h2 className="text-xl font-bold text-foreground">{displayName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-eco/10 text-eco border-0">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-accent" />
                    {stats.rating}
                  </span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="mt-4 lg:mt-0">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <Car className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{stats.totalRides.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Rides</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{stats.rating}</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-eco mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">₹{(stats.totalEarnings / 1000).toFixed(0)}K</p>
            <p className="text-xs text-muted-foreground">Lifetime</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4 text-center">
            <Leaf className="h-6 w-6 text-eco mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{stats.carbonSaved}</p>
            <p className="text-xs text-muted-foreground">kg CO₂ Saved</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {achievements.map((achievement, i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/50 text-center">
                <achievement.icon className={`h-8 w-8 mx-auto mb-2 ${achievement.color}`} />
                <p className="font-medium text-sm text-foreground">{achievement.title}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-display">Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Acceptance Rate</span>
              <span className="font-medium text-foreground">{stats.acceptanceRate}%</span>
            </div>
            <Progress value={stats.acceptanceRate} className="h-2" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Completion Rate</span>
              <span className="font-medium text-foreground">{stats.completionRate}%</span>
            </div>
            <Progress value={stats.completionRate} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Info */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              My Vehicle
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">{vehicle.make} {vehicle.model}</p>
              <p className="text-sm text-muted-foreground">{vehicle.color} • {vehicle.year} • {vehicle.type}</p>
              <Badge variant="secondary" className="mt-2">{vehicle.plate}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-display">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{email}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{phone}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Driving License", status: "verified" },
            { name: "Vehicle RC", status: "verified" },
            { name: "Insurance", status: "verified" },
            { name: "Aadhaar Card", status: "verified" },
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
              <span className="font-medium text-foreground">{doc.name}</span>
              <Badge className="bg-eco/10 text-eco border-0">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg font-display">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Get notified for new ride requests</p>
            </div>
            <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Accept Shared Rides</p>
              <p className="text-sm text-muted-foreground">Earn more with ride sharing</p>
            </div>
            <Switch checked={shareRidesEnabled} onCheckedChange={setShareRidesEnabled} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}