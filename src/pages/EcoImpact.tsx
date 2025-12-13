import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Leaf, 
  TreeDeciduous, 
  Droplets, 
  Wind, 
  Trophy,
  TrendingUp,
  Users,
  Car,
  Gift,
  ArrowRight
} from "lucide-react";

export default function EcoImpact() {
  const carbonSaved = 12.5;
  const nextMilestone = 25;
  const progress = (carbonSaved / nextMilestone) * 100;
  const ecoCredits = 150;
  const treesEquivalent = 3;

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <Badge className="bg-eco/10 text-eco border-0 mb-4">
          <Leaf className="h-3 w-3 mr-1" />
          Green Miles
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold font-display text-foreground mb-2">
          Your Eco Impact
        </h1>
        <p className="text-muted-foreground">
          Every shared ride makes a difference. Track your contribution to a cleaner planet.
        </p>
      </div>

      {/* Main Stats Card */}
      <Card className="border-0 shadow-card overflow-hidden">
        <div className="gradient-eco p-8 text-eco-foreground text-center">
          <div className="max-w-md mx-auto">
            <div className="h-20 w-20 rounded-full bg-eco-foreground/20 flex items-center justify-center mx-auto mb-4 pulse-eco">
              <Leaf className="h-10 w-10" />
            </div>
            <p className="text-lg opacity-90 mb-2">Total Carbon Saved</p>
            <p className="text-5xl lg:text-6xl font-bold mb-1">{carbonSaved} kg</p>
            <p className="text-sm opacity-80">CO₂ prevented from entering the atmosphere</p>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="max-w-md mx-auto space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress to next milestone</span>
              <span className="font-medium text-foreground">{carbonSaved}/{nextMilestone} kg</span>
            </div>
            <Progress value={progress} className="h-3" />
            <p className="text-center text-sm text-muted-foreground">
              Save {nextMilestone - carbonSaved} more kg to unlock <span className="text-eco font-medium">Green Crusader</span> badge!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Impact Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-xl bg-eco/10 flex items-center justify-center mx-auto mb-3">
              <TreeDeciduous className="h-6 w-6 text-eco" />
            </div>
            <p className="text-3xl font-bold text-foreground">{treesEquivalent}</p>
            <p className="text-sm text-muted-foreground">Trees Saved</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center mx-auto mb-3">
              <Droplets className="h-6 w-6 text-info" />
            </div>
            <p className="text-3xl font-bold text-foreground">156</p>
            <p className="text-sm text-muted-foreground">Liters Fuel Saved</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">28</p>
            <p className="text-sm text-muted-foreground">Shared Rides</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <Wind className="h-6 w-6 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">450</p>
            <p className="text-sm text-muted-foreground">km Distance Shared</p>
          </CardContent>
        </Card>
      </div>

      {/* Eco Credits Card */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Gift className="h-5 w-5 text-eco" />
              Eco Credits
            </CardTitle>
            <Badge className="bg-eco text-eco-foreground">{ecoCredits} credits</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Earn 50 Eco-Credits for every 100kg of CO₂ saved. Redeem for wallet cash or donate to plant real trees!
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-border bg-secondary/30 hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Convert to Wallet</p>
                  <p className="text-xs text-muted-foreground">100 credits = ₹50 wallet cash</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2">
                Redeem Now
              </Button>
            </div>
            
            <div className="p-4 rounded-xl border border-border bg-secondary/30 hover:border-eco/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-eco/10 flex items-center justify-center">
                  <TreeDeciduous className="h-5 w-5 text-eco" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Plant a Tree</p>
                  <p className="text-xs text-muted-foreground">100 credits = 1 tree planted</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2 border-eco text-eco hover:bg-eco hover:text-eco-foreground">
                Donate Credits
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Trophy className="h-5 w-5 text-warning" />
              Green Miles Leaderboard
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: "Priya S.", carbonSaved: 156, badge: "🌿 Eco Champion" },
              { rank: 2, name: "Rahul K.", carbonSaved: 134, badge: "🌱 Green Hero" },
              { rank: 3, name: "Neha G.", carbonSaved: 98, badge: "🍃 Nature Friend" },
              { rank: 12, name: "You", carbonSaved: carbonSaved, badge: "", isYou: true },
            ].map((user, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-4 rounded-xl ${
                  user.isYou 
                    ? 'bg-primary/5 border-2 border-primary' 
                    : 'bg-secondary/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    user.rank === 1 ? 'bg-warning text-warning-foreground' :
                    user.rank === 2 ? 'bg-muted-foreground/20 text-muted-foreground' :
                    user.rank === 3 ? 'bg-accent/20 text-accent' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {user.rank}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    {user.badge && <p className="text-xs text-muted-foreground">{user.badge}</p>}
                    {user.isYou && <p className="text-xs text-primary font-medium">That's you!</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{user.carbonSaved} kg</p>
                  <p className="text-xs text-muted-foreground">CO₂ saved</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
