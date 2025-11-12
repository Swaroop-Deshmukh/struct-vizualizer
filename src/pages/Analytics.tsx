import { BarChart3, TrendingUp, Activity, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
        <p className="text-muted-foreground">Monitor database performance and usage patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Query Performance</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4ms</div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              18% faster than yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,456</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cache Hit Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-success mt-1">Excellent performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Activity className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/10</div>
            <p className="text-xs text-muted-foreground mt-1">Available connections</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Query Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {[42, 55, 38, 65, 48, 72, 58, 45, 52, 68, 43, 56].map((height, index) => (
                <div key={index} className="flex-1 bg-primary rounded-t" style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Query Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Find", count: 1245, percentage: 50, color: "bg-primary" },
                { type: "Insert", count: 623, percentage: 25, color: "bg-accent" },
                { type: "Update", count: 374, percentage: 15, color: "bg-success" },
                { type: "Delete", count: 214, percentage: 10, color: "bg-warning" },
              ].map((item) => (
                <div key={item.type}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{item.type}</span>
                    <span className="text-sm text-muted-foreground">{item.count} queries</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Slowest Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { query: 'db.users.find({ "age": { "$gt": 25 } })', time: "145ms", collection: "users" },
              { query: 'db.orders.aggregate([...])', time: "128ms", collection: "orders" },
              { query: 'db.products.find({ "$text": { "$search": "..." } })', time: "98ms", collection: "products" },
            ].map((item, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <code className="text-sm font-mono text-foreground flex-1">{item.query}</code>
                  <span className="text-sm font-medium text-warning ml-4">{item.time}</span>
                </div>
                <span className="text-xs text-muted-foreground">Collection: {item.collection}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
