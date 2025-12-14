import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Car,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Gift,
  Leaf,
  Clock,
  ChevronRight,
  Target,
  Zap
} from "lucide-react";

// Mock data for earnings
const weeklyData = [
  { day: "Mon", earnings: 1250, rides: 8, shared: 5 },
  { day: "Tue", earnings: 1680, rides: 11, shared: 7 },
  { day: "Wed", earnings: 980, rides: 6, shared: 4 },
  { day: "Thu", earnings: 2100, rides: 14, shared: 10 },
  { day: "Fri", earnings: 2450, rides: 16, shared: 12 },
  { day: "Sat", earnings: 2840, rides: 18, shared: 14 },
  { day: "Sun", earnings: 1920, rides: 12, shared: 8 },
];

const recentTransactions = [
  { id: 1, type: "ride", amount: 380, description: "Shared ride - CP to Gurgaon", time: "2 hours ago", passengers: 3, bonus: 45 },
  { id: 2, type: "ride", amount: 250, description: "Solo ride - Saket to Nehru Place", time: "4 hours ago", passengers: 1, bonus: 0 },
  { id: 3, type: "bonus", amount: 200, description: "Peak hour bonus", time: "5 hours ago", passengers: 0, bonus: 200 },
  { id: 4, type: "ride", amount: 520, description: "Shared ride - Noida to Delhi", time: "6 hours ago", passengers: 4, bonus: 80 },
  { id: 5, type: "ride", amount: 180, description: "Solo ride - Khan Market", time: "8 hours ago", passengers: 1, bonus: 0 },
  { id: 6, type: "bonus", amount: 500, description: "Daily target bonus", time: "Yesterday", passengers: 0, bonus: 500 },
];

const bonuses = [
  { id: 1, name: "Peak Hour Bonus", description: "Earn 1.5x during 8-10 AM", progress: 75, earned: 450, target: 600, icon: Clock },
  { id: 2, name: "Sharing Champion", description: "Complete 20 shared rides", progress: 60, earned: 12, target: 20, icon: Users },
  { id: 3, name: "Weekly Target", description: "Complete 80 rides this week", progress: 85, earned: 68, target: 80, icon: Target },
  { id: 4, name: "Eco Warrior", description: "Save 50kg CO₂ this week", progress: 45, earned: 22.5, target: 50, icon: Leaf },
];

export default function DriverEarnings() {
  const [selectedPeriod, setSelectedPeriod] = useState<"today" | "week" | "month">("week");

  const todayStats = {
    totalEarnings: 2840,
    rides: 18,
    sharedRides: 14,
    bonuses: 680,
    platformFee: 426,
    netEarnings: 3094,
    avgPerRide: 158,
    hoursOnline: 9.5,
  };

  const weekStats = {
    totalEarnings: 13220,
    rides: 85,
    sharedRides: 60,
    bonuses: 2450,
    platformFee: 1983,
    netEarnings: 13687,
    avgPerRide: 156,
    hoursOnline: 52,
  };

  const monthStats = {
    totalEarnings: 48500,
    rides: 320,
    sharedRides: 224,
    bonuses: 8200,
    platformFee: 7275,
    netEarnings: 49425,
    avgPerRide: 152,
    hoursOnline: 195,
  };

  const stats = selectedPeriod === "today" ? todayStats : selectedPeriod === "week" ? weekStats : monthStats;
  const maxEarnings = Math.max(...weeklyData.map(d => d.earnings));

  const periodLabels = {
    today: "Today",
    week: "This Week",
    month: "This Month",
  };

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-display text-foreground">Earnings</h1>
          <p className="text-muted-foreground mt-1">Track your income and bonuses</p>
        </div>
        
        {/* Period Selector */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-secondary">
          {(["today", "week", "month"] as const).map((period) => (
            <Button
              key={period}
              size="sm"
              variant={selectedPeriod === period ? "default" : "ghost"}
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period ? "gradient-primary" : ""}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card col-span-2 lg:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Net Earnings</span>
              <div className="h-8 w-8 rounded-lg bg-eco/10 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-eco" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">₹{stats.netEarnings.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1 text-sm text-eco">
              <ArrowUpRight className="h-3 w-3" />
              <span>+12% vs last {selectedPeriod}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Rides</span>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Car className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.rides}</p>
            <p className="text-xs text-muted-foreground mt-1">{stats.sharedRides} shared</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Bonuses</span>
              <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Gift className="h-4 w-4 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">₹{stats.bonuses.toLocaleString()}</p>
            <p className="text-xs text-eco mt-1">+₹{Math.round(stats.bonuses * 0.15)} extra</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Avg/Ride</span>
              <div className="h-8 w-8 rounded-lg bg-sharing/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-sharing" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">₹{stats.avgPerRide}</p>
            <p className="text-xs text-muted-foreground mt-1">{stats.hoursOnline}h online</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Chart */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Weekly Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-48">
                {weeklyData.map((day, index) => {
                  const heightPercent = (day.earnings / maxEarnings) * 100;
                  const isToday = index === weeklyData.length - 1;
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs font-medium text-foreground">₹{(day.earnings / 1000).toFixed(1)}k</div>
                      <div className="w-full relative h-32">
                        <div
                          className={`absolute bottom-0 w-full rounded-t-lg transition-all ${
                            isToday ? 'gradient-primary' : 'bg-secondary'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                        {/* Shared rides portion */}
                        <div
                          className="absolute bottom-0 w-full rounded-t-lg bg-sharing/30"
                          style={{ height: `${(day.shared / day.rides) * heightPercent}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">{day.day}</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-secondary" />
                  <span className="text-muted-foreground">Solo rides</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-sharing/30" />
                  <span className="text-muted-foreground">Shared rides</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Earnings Breakdown */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-eco" />
                Earnings Breakdown - {periodLabels[selectedPeriod]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Shared Rides</span>
                    <Badge className="bg-sharing/10 text-sharing border-0">
                      <Users className="h-3 w-3 mr-1" />
                      {stats.sharedRides}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{Math.round(stats.totalEarnings * 0.7).toLocaleString()}
                  </p>
                  <p className="text-xs text-eco mt-1">+23% extra from sharing</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Solo Rides</span>
                    <Badge variant="secondary">
                      <Car className="h-3 w-3 mr-1" />
                      {stats.rides - stats.sharedRides}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{Math.round(stats.totalEarnings * 0.3).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Standard fares</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Ride Earnings</span>
                  <span className="font-medium">₹{stats.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Gift className="h-4 w-4 text-accent" />
                    Bonuses & Incentives
                  </span>
                  <span className="font-medium text-eco">+₹{stats.bonuses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Platform Fee (15%)</span>
                  <span className="font-medium text-destructive">-₹{stats.platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="font-semibold text-foreground">Net Earnings</span>
                  <span className="text-xl font-bold text-eco">₹{stats.netEarnings.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-display">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                      transaction.type === "bonus" ? "bg-accent/10" : transaction.passengers > 1 ? "bg-sharing/10" : "bg-primary/10"
                    }`}>
                      {transaction.type === "bonus" ? (
                        <Gift className={`h-5 w-5 text-accent`} />
                      ) : transaction.passengers > 1 ? (
                        <Users className="h-5 w-5 text-sharing" />
                      ) : (
                        <Car className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{transaction.time}</span>
                        {transaction.passengers > 1 && (
                          <>
                            <span>•</span>
                            <span className="text-sharing">{transaction.passengers} passengers</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.type === "bonus" ? "text-accent" : "text-foreground"}`}>
                      +₹{transaction.amount}
                    </p>
                    {transaction.bonus > 0 && transaction.type !== "bonus" && (
                      <p className="text-xs text-eco">+₹{transaction.bonus} bonus</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Bonuses & Goals */}
        <div className="space-y-6">
          {/* Active Bonuses */}
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Active Bonuses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bonuses.map((bonus) => (
                <div key={bonus.id} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <bonus.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{bonus.name}</p>
                        <p className="text-xs text-muted-foreground">{bonus.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {bonus.name.includes("CO₂") ? `${bonus.earned}kg` : bonus.name.includes("₹") ? `₹${bonus.earned}` : bonus.earned} / {bonus.name.includes("CO₂") ? `${bonus.target}kg` : bonus.name.includes("₹") ? `₹${bonus.target}` : bonus.target}
                      </span>
                    </div>
                    <Progress value={bonus.progress} className="h-2" />
                    <p className="text-xs text-eco">{bonus.progress}% complete</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sharing Impact */}
          <Card className="border-2 border-sharing bg-sharing/5">
            <CardHeader>
              <CardTitle className="text-lg font-display flex items-center gap-2">
                <Users className="h-5 w-5 text-sharing" />
                Sharing Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <p className="text-4xl font-bold text-sharing">+₹{Math.round(stats.totalEarnings * 0.23).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">Extra earnings from shared rides</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-card text-center">
                  <p className="text-lg font-bold text-foreground">{stats.sharedRides}</p>
                  <p className="text-xs text-muted-foreground">Shared rides</p>
                </div>
                <div className="p-3 rounded-lg bg-card text-center">
                  <p className="text-lg font-bold text-foreground">{Math.round((stats.sharedRides / stats.rides) * 100)}%</p>
                  <p className="text-xs text-muted-foreground">Share rate</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-eco/10 flex items-center gap-3">
                <Leaf className="h-8 w-8 text-eco" />
                <div>
                  <p className="font-medium text-foreground">{Math.round(stats.sharedRides * 1.2)}kg CO₂ Saved</p>
                  <p className="text-xs text-muted-foreground">By enabling ride sharing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Withdraw Button */}
          <Card className="border-0 shadow-card">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-3xl font-bold text-foreground">₹{stats.netEarnings.toLocaleString()}</p>
                </div>
                <Button className="w-full gradient-primary hover:opacity-90" size="lg">
                  <Wallet className="h-4 w-4 mr-2" />
                  Withdraw to Bank
                </Button>
                <p className="text-xs text-muted-foreground">Instant transfer available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
