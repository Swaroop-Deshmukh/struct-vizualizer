import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet as WalletIcon, 
  Plus, 
  ArrowDownLeft, 
  ArrowUpRight,
  CreditCard,
  Gift,
  Clock,
  ChevronRight,
  Leaf
} from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "credit",
    title: "Ride Cashback",
    description: "Co-passenger joined your ride",
    amount: "+₹45",
    date: "Today, 2:30 PM",
    icon: ArrowDownLeft,
  },
  {
    id: 2,
    type: "debit",
    title: "Ride Payment",
    description: "Trip to Cyber Hub",
    amount: "-₹180",
    date: "Today, 9:15 AM",
    icon: ArrowUpRight,
  },
  {
    id: 3,
    type: "credit",
    title: "Wallet Top-up",
    description: "Added via UPI",
    amount: "+₹500",
    date: "Yesterday, 6:00 PM",
    icon: Plus,
  },
  {
    id: 4,
    type: "credit",
    title: "Eco Credits Redeemed",
    description: "100 credits → ₹50",
    amount: "+₹50",
    date: "2 days ago",
    icon: Gift,
  },
  {
    id: 5,
    type: "debit",
    title: "Ride Payment",
    description: "Trip to Noida",
    amount: "-₹120",
    date: "3 days ago",
    icon: ArrowUpRight,
  },
];

export default function Wallet() {
  const balance = 785;
  const ecoCredits = 150;
  const totalSaved = 2450;

  return (
    <div className="min-h-screen p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-foreground">Wallet</h1>
        <p className="text-muted-foreground mt-1">Manage your balance and view transactions</p>
      </div>

      {/* Balance Cards */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Main Balance */}
        <Card className="lg:col-span-2 border-0 shadow-card overflow-hidden">
          <div className="gradient-primary p-6 text-primary-foreground">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm opacity-80 mb-1">Available Balance</p>
                <p className="text-4xl lg:text-5xl font-bold">₹{balance}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <WalletIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Money
              </Button>
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <CreditCard className="h-4 w-4 mr-2" />
                Pay
              </Button>
            </div>
          </div>
        </Card>

        {/* Eco Credits */}
        <Card className="border-0 shadow-card">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-eco/10 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-eco" />
                </div>
                <Badge className="bg-eco/10 text-eco border-0">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Eco Credits</p>
              <p className="text-3xl font-bold text-foreground">{ecoCredits}</p>
              <p className="text-xs text-muted-foreground mt-1">Worth ₹{ecoCredits / 2}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4 border-eco text-eco hover:bg-eco hover:text-eco-foreground">
              Redeem
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Saved</p>
            <p className="text-xl font-bold text-eco">₹{totalSaved}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">This Month</p>
            <p className="text-xl font-bold text-foreground">₹1,240</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Cashbacks</p>
            <p className="text-xl font-bold text-accent">₹890</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Spent on Rides</p>
            <p className="text-xl font-bold text-foreground">₹4,560</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-display">Payment Methods</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              <Plus className="h-4 w-4 mr-1" />
              Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { type: "UPI", name: "john@paytm", icon: "💳", primary: true },
            { type: "Card", name: "•••• 4532", icon: "💳", primary: false },
          ].map((method, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-lg">
                  {method.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground">{method.type}</p>
                  <p className="text-sm text-muted-foreground">{method.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.primary && (
                  <Badge variant="secondary">Primary</Badge>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Transaction History */}
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
          {transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  transaction.type === 'credit' ? 'bg-eco/10' : 'bg-muted'
                }`}>
                  <transaction.icon className={`h-5 w-5 ${
                    transaction.type === 'credit' ? 'text-eco' : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.title}</p>
                  <p className="text-sm text-muted-foreground">{transaction.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${
                  transaction.type === 'credit' ? 'text-eco' : 'text-foreground'
                }`}>
                  {transaction.amount}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {transaction.date}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
