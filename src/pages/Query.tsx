import { useState } from "react";
import { Search, Play, Save, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Query() {
  const [query, setQuery] = useState('{\n  "name": "John Doe"\n}');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sampleResults = [
    { _id: "507f1f77bcf86cd799439011", name: "John Doe", email: "john@example.com", age: 28 },
    { _id: "507f1f77bcf86cd799439012", name: "John Smith", email: "jsmith@example.com", age: 32 },
  ];

  const handleRunQuery = () => {
    setIsLoading(true);
    setTimeout(() => {
      setResults(sampleResults);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Query Builder</h1>
        <p className="text-muted-foreground">Execute queries and explore your data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Query Editor</CardTitle>
                <div className="flex items-center gap-2">
                  <Select defaultValue="users">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select collection" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">users</SelectItem>
                      <SelectItem value="products">products</SelectItem>
                      <SelectItem value="orders">orders</SelectItem>
                      <SelectItem value="categories">categories</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleRunQuery}>
                    <Play className="h-4 w-4 mr-2" />
                    Run Query
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="find">
                <TabsList className="mb-4">
                  <TabsTrigger value="find">Find</TabsTrigger>
                  <TabsTrigger value="aggregate">Aggregate</TabsTrigger>
                  <TabsTrigger value="update">Update</TabsTrigger>
                  <TabsTrigger value="delete">Delete</TabsTrigger>
                </TabsList>
                <TabsContent value="find">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Filter</label>
                      <Textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="font-mono text-sm bg-muted"
                        rows={8}
                        placeholder='{ "field": "value" }'
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Project</label>
                        <Textarea
                          className="font-mono text-sm bg-muted"
                          rows={4}
                          placeholder='{ "name": 1, "email": 1 }'
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Sort</label>
                        <Textarea
                          className="font-mono text-sm bg-muted"
                          rows={4}
                          placeholder='{ "createdAt": -1 }'
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Results ({results.length})</CardTitle>
                {results.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Executed in 12ms</span>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Executing query...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <pre className="text-sm overflow-auto">
                        {JSON.stringify(result, null, 2)}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No results yet. Run a query to see results.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Query History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { query: '{ "status": "active" }', time: "2 mins ago" },
                  { query: '{ "age": { "$gt": 25 } }', time: "15 mins ago" },
                  { query: '{ "category": "electronics" }', time: "1 hour ago" },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="w-full p-3 text-left border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    onClick={() => setQuery(item.query)}
                  >
                    <code className="text-xs font-mono text-foreground block mb-1">
                      {item.query}
                    </code>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Query Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-foreground mb-1">Find by ID</p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    {'{ "_id": "507f..." }'}
                  </code>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Range Query</p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    {'{ "age": { "$gte": 18 } }'}
                  </code>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">Text Search</p>
                  <code className="text-xs bg-muted p-2 rounded block">
                    {'{ "$text": { "$search": "..." } }'}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
