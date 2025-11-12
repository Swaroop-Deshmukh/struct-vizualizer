import { BookOpen } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Conclusion() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <SectionHeader
        icon={BookOpen}
        title="Conclusion and Learning Outcomes"
        description="Reflect on your project journey, challenges, and key takeaways"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="summary">Recap your project and whether you met your objectives</Label>
            <Textarea
              id="summary"
              placeholder="Briefly summarize the project, its goals, and achievements..."
              rows={5}
              className="bg-secondary"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Challenges Faced</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="challenges">Discuss technical and non-technical difficulties and how you overcame them</Label>
            <Textarea
              id="challenges"
              placeholder="Challenge 1: ...&#10;Solution: ...&#10;&#10;Challenge 2: ...&#10;Solution: ..."
              rows={8}
              className="bg-secondary"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="technicalLearning">Technical Learnings</Label>
              <Textarea
                id="technicalLearning"
                placeholder="• Understanding of data structure X&#10;• Implementation of algorithm Y&#10;• When to use Z vs W..."
                rows={5}
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="practicalLearning">Practical Learnings</Label>
              <Textarea
                id="practicalLearning"
                placeholder="• Debugging techniques learned&#10;• Code optimization strategies&#10;• Design pattern applications..."
                rows={5}
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="softSkills">Soft Skills</Label>
              <Textarea
                id="softSkills"
                placeholder="• Teamwork and collaboration&#10;• Time management&#10;• Communication and documentation..."
                rows={5}
                className="bg-secondary"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Future Enhancements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="enhancements">Suggest how the project could be improved or extended</Label>
            <Textarea
              id="enhancements"
              placeholder="• Adding a GUI&#10;• Implementing feature X&#10;• Optimizing with data structure Y&#10;• Scaling to handle Z..."
              rows={6}
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
