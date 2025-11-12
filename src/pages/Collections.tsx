import { useState } from "react";
import { Table2, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const sampleCollections = [
  { id: 1, name: "users", documents: 450, size: "128 MB", indexes: 3, created: "2024-01-15" },
  { id: 2, name: "products", documents: 320, size: "64 MB", indexes: 2, created: "2024-01-20" },
  { id: 3, name: "orders", documents: 280, size: "42 MB", indexes: 4, created: "2024-02-01" },
  { id: 4, name: "categories", documents: 48, size: "8 MB", indexes: 2, created: "2024-02-10" },
  { id: 5, name: "reviews", documents: 892, size: "156 MB", indexes: 3, created: "2024-02-15" },
  { id: 6, name: "inventory", documents: 650, size: "98 MB", indexes: 5, created: "2024-03-01" },
];

export default function Collections() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollections = sampleCollections.filter((col) =>
    col.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Collections</h1>
          <p className="text-muted-foreground">Manage your database collections</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Collection
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Collections ({filteredCollections.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Indexes</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCollections.map((collection) => (
                <TableRow key={collection.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Table2 className="h-4 w-4 text-primary" />
                      {collection.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{collection.documents.toLocaleString()}</Badge>
                  </TableCell>
                  <TableCell>{collection.size}</TableCell>
                  <TableCell>{collection.indexes}</TableCell>
                  <TableCell className="text-muted-foreground">{collection.created}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {sampleCollections.reduce((acc, col) => acc + col.documents, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">496 MB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Total Indexes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {sampleCollections.reduce((acc, col) => acc + col.indexes, 0)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
