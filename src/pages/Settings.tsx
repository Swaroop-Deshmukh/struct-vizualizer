import { Settings as SettingsIcon, Database, Shield, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your database and application preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="dbName">Database Name</Label>
                <Input id="dbName" defaultValue="datastructure_db" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxConnections">Max Connections</Label>
                <Input id="maxConnections" type="number" defaultValue="10" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Auto Backup</p>
                  <p className="text-sm text-muted-foreground">Automatically backup database daily</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Query Logging</p>
                  <p className="text-sm text-muted-foreground">Log all database queries</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connection">
          <Card>
            <CardHeader>
              <CardTitle>Connection Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="host">Host</Label>
                <Input id="host" defaultValue="localhost" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input id="port" defaultValue="27017" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="connectionString">Connection String</Label>
                <Input 
                  id="connectionString" 
                  defaultValue="mongodb://localhost:27017/datastructure_db"
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Use SSL</p>
                  <p className="text-sm text-muted-foreground">Enable SSL/TLS encryption</p>
                </div>
                <Switch />
              </div>

              <Button className="bg-primary hover:bg-primary/90">Test Connection</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Require Authentication</p>
                  <p className="text-sm text-muted-foreground">Require username and password</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">IP Whitelist</p>
                  <p className="text-sm text-muted-foreground">Only allow connections from specific IPs</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Query Timeout</p>
                  <p className="text-sm text-muted-foreground">Automatically cancel long-running queries</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeout">Query Timeout (seconds)</Label>
                <Input id="timeout" type="number" defaultValue="30" />
              </div>

              <Button className="bg-primary hover:bg-primary/90">Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Performance Alerts</p>
                  <p className="text-sm text-muted-foreground">Notify when queries are slow</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Storage Alerts</p>
                  <p className="text-sm text-muted-foreground">Notify when storage is running low</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Connection Alerts</p>
                  <p className="text-sm text-muted-foreground">Notify on connection issues</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Notification Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>

              <Button className="bg-primary hover:bg-primary/90">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
