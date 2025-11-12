import { FileJson, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sampleSchema = {
  users: [
    { field: "_id", type: "ObjectId", required: true, unique: true },
    { field: "name", type: "String", required: true, unique: false },
    { field: "email", type: "String", required: true, unique: true },
    { field: "age", type: "Number", required: false, unique: false },
    { field: "createdAt", type: "Date", required: true, unique: false },
    { field: "address", type: "Object", required: false, unique: false },
  ],
  products: [
    { field: "_id", type: "ObjectId", required: true, unique: true },
    { field: "name", type: "String", required: true, unique: false },
    { field: "price", type: "Number", required: true, unique: false },
    { field: "category", type: "String", required: true, unique: false },
    { field: "inStock", type: "Boolean", required: true, unique: false },
  ],
};

export default function Schema() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Schema Explorer</h1>
          <p className="text-muted-foreground">View and manage your collection schemas</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Field
        </Button>
      </div>

      {Object.entries(sampleSchema).map(([collectionName, fields]) => (
        <Card key={collectionName}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileJson className="h-5 w-5 text-primary" />
                <CardTitle className="capitalize">{collectionName}</CardTitle>
                <Badge variant="secondary">{fields.length} fields</Badge>
              </div>
              <Button size="sm" variant="outline">
                Edit Schema
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Field Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Required</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Unique</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field, index) => (
                    <tr key={field.field} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                      <td className="px-4 py-3">
                        <code className="text-sm font-mono text-foreground">{field.field}</code>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline">{field.type}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {field.required ? (
                          <Badge className="bg-success/10 text-success border-success/20">Yes</Badge>
                        ) : (
                          <Badge variant="secondary">No</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {field.unique ? (
                          <Badge className="bg-accent/10 text-accent border-accent/20">Yes</Badge>
                        ) : (
                          <Badge variant="secondary">No</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="ghost" className="text-xs">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Schema Validation Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Email Validation</p>
              <code className="text-xs font-mono text-muted-foreground block">
                Pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{'{2,}'}$
              </code>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Age Range</p>
              <code className="text-xs font-mono text-muted-foreground block">
                Min: 0, Max: 150
              </code>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Price Validation</p>
              <code className="text-xs font-mono text-muted-foreground block">
                Type: Number, Min: 0
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
