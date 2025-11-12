import { Database, Server, HardDrive, Activity, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Database Overview</h1>
        <p className="text-muted-foreground">Monitor your database performance and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
            <Database className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <Server className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground mt-1">+180 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256 MB</div>
            <Progress value={45} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">45% of 512 MB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Activity className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12ms</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                15% faster
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Collections */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "users", docs: 450, size: "128 MB", updated: "2 hours ago" },
              { name: "products", docs: 320, size: "64 MB", updated: "5 hours ago" },
              { name: "orders", docs: 280, size: "42 MB", updated: "1 day ago" },
              { name: "categories", docs: 48, size: "8 MB", updated: "2 days ago" },
            ].map((collection) => (
              <div key={collection.name} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{collection.name}</p>
                    <p className="text-sm text-muted-foreground">{collection.docs} documents</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{collection.size}</p>
                  <p className="text-xs text-muted-foreground">{collection.updated}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full p-3 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <p className="font-medium text-foreground">Create New Collection</p>
              <p className="text-sm text-muted-foreground">Add a new collection to your database</p>
            </button>
            <button className="w-full p-3 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <p className="font-medium text-foreground">Import Data</p>
              <p className="text-sm text-muted-foreground">Import data from JSON or CSV</p>
            </button>
            <button className="w-full p-3 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <p className="font-medium text-foreground">Backup Database</p>
              <p className="text-sm text-muted-foreground">Create a backup of your data</p>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Database Status</span>
              <span className="px-2 py-1 text-xs font-medium bg-success/10 text-success rounded">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Connection Pool</span>
              <span className="text-sm text-muted-foreground">8/10 connections</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Cache Hit Rate</span>
              <span className="text-sm text-muted-foreground">94.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Last Backup</span>
              <span className="text-sm text-muted-foreground">Yesterday 2:00 AM</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
