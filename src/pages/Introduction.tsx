import { Info } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Introduction() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <SectionHeader
        icon={Info}
        title="Introduction"
        description="Provide an overview of your project, objectives, and scope"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="overview">Briefly describe what your project does and what problem it solves</Label>
            <Textarea
              id="overview"
              placeholder="Describe your project's purpose, functionality, and the problem it addresses..."
              rows={6}
              className="bg-secondary"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objectives</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="objectives">List the specific goals of your project</Label>
            <Textarea
              id="objectives"
              placeholder="• Objective 1: ...&#10;• Objective 2: ...&#10;• Objective 3: ..."
              rows={6}
              className="bg-secondary"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scope</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="scope">Define what functionalities are included and excluded</Label>
            <Textarea
              id="scope"
              placeholder="Included:&#10;• Feature 1&#10;• Feature 2&#10;&#10;Not Included:&#10;• Feature X&#10;• Feature Y"
              rows={8}
              className="bg-secondary"
            />
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
