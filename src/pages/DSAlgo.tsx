import { Database, Plus } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DSAlgo() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <SectionHeader
        icon={Database}
        title="Data Structures & Algorithms"
        description="Detail the data structures and algorithms used in your project"
      />

      <Tabs defaultValue="datastructures" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="datastructures">Data Structures</TabsTrigger>
          <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
        </TabsList>

        <TabsContent value="datastructures" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Data Structure Entry #1</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add More
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dsName">Name of Data Structure</Label>
                <Input
                  id="dsName"
                  placeholder="e.g., Doubly Linked List"
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dsJustification">Justification for Use</Label>
                <Textarea
                  id="dsJustification"
                  placeholder="Why did you choose this data structure? Explain its advantages..."
                  rows={4}
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dsUseCase">Specific Use-case in Project</Label>
                <Textarea
                  id="dsUseCase"
                  placeholder="Describe exactly where and how it is used in your project..."
                  rows={4}
                  className="bg-secondary"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="algorithms" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Algorithm Entry #1</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add More
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="algoName">Name of Algorithm</Label>
                <Input
                  id="algoName"
                  placeholder="e.g., Dijkstra's Shortest Path"
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="algoDescription">Brief Description & Pseudo-code</Label>
                <Textarea
                  id="algoDescription"
                  placeholder="Provide a short explanation and pseudo-code..."
                  rows={6}
                  className="bg-secondary font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeComplexity">Time Complexity</Label>
                  <Input
                    id="timeComplexity"
                    placeholder="e.g., O(n log n)"
                    className="bg-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spaceComplexity">Space Complexity</Label>
                  <Input
                    id="spaceComplexity"
                    placeholder="e.g., O(n)"
                    className="bg-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="algoJustification">Justification & Use-case</Label>
                <Textarea
                  id="algoJustification"
                  placeholder="Explain why this algorithm was the best choice for the task..."
                  rows={4}
                  className="bg-secondary"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button className="bg-primary hover:bg-primary/90">
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
