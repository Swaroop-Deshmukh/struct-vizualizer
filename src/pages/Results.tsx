import { BarChart3, Upload } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Results() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <SectionHeader
        icon={BarChart3}
        title="Results and Output"
        description="Showcase your application's functionality with screenshots and performance analysis"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Screenshots</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upload clear, labeled screenshots showing different functionalities
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="space-y-2">
                  <Label>Screenshot {num}</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Upload image</p>
                  </div>
                  <Textarea
                    placeholder="Caption/Description"
                    rows={2}
                    className="bg-secondary text-sm"
                  />
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Add More Screenshots
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="performanceMetrics">Performance Metrics & Comparisons</Label>
              <Textarea
                id="performanceMetrics"
                placeholder="Include graphs, tables, or data comparing performance of different data structures/algorithms...&#10;&#10;Example:&#10;- Search time: Hash Table vs Array&#10;- Memory usage: Linked List vs Array&#10;- Execution time for different input sizes"
                rows={8}
                className="bg-secondary"
              />
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                Upload Performance Graphs/Charts
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG or PDF
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-primary hover:bg-primary/90">
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
