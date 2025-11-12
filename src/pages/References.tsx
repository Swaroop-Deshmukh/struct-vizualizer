import { Library, Plus } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function References() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <SectionHeader
        icon={Library}
        title="References"
        description="List all sources, documentation, and materials used in your project"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reference Entries</CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Reference
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 p-4 border border-border rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="ref1Type">Reference Type</Label>
                <Input
                  id="ref1Type"
                  placeholder="e.g., Book, Website, Research Paper, Documentation"
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ref1Citation">Citation</Label>
                <Textarea
                  id="ref1Citation"
                  placeholder="e.g., Author(s). (Year). Title. Publisher. URL"
                  rows={3}
                  className="bg-secondary"
                />
              </div>
            </div>

            <div className="space-y-4 p-4 border border-border rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="ref2Type">Reference Type</Label>
                <Input
                  id="ref2Type"
                  placeholder="e.g., Book, Website, Research Paper, Documentation"
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ref2Citation">Citation</Label>
                <Textarea
                  id="ref2Citation"
                  placeholder="e.g., Author(s). (Year). Title. Publisher. URL"
                  rows={3}
                  className="bg-secondary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="additionalResources">Other materials consulted (optional)</Label>
            <Textarea
              id="additionalResources"
              placeholder="Videos, tutorials, stack overflow discussions, etc."
              rows={5}
              className="bg-secondary"
            />
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="outline">
            Export Report as PDF
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Save Report
          </Button>
        </div>
      </div>
    </div>
  );
}
