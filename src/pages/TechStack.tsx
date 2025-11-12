import { Code2 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TechStack() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <SectionHeader
        icon={Code2}
        title="Tech Stack"
        description="Document the software and hardware requirements for your project"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Software Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="programmingLanguage">Programming Language</Label>
              <Input
                id="programmingLanguage"
                placeholder="e.g., Python, Java, C++"
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="libraries">Libraries/Frameworks</Label>
              <Textarea
                id="libraries"
                placeholder="e.g., STL for C++, Collections for Java, Tkinter for GUI..."
                rows={4}
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="devTools">Development Tools</Label>
              <Textarea
                id="devTools"
                placeholder="e.g., VS Code, IntelliJ, Git/GitHub..."
                rows={4}
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="otherSoftware">Other Software</Label>
              <Textarea
                id="otherSoftware"
                placeholder="e.g., MySQL for database, Postman for API testing..."
                rows={4}
                className="bg-secondary"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hardware Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="systemRequirements">Minimum System Requirements</Label>
              <Textarea
                id="systemRequirements"
                placeholder="Processor: ...&#10;RAM: ...&#10;Storage: ..."
                rows={4}
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="peripherals">Peripherals (if any)</Label>
              <Textarea
                id="peripherals"
                placeholder="e.g., Barcode scanner, specific sensors..."
                rows={3}
                className="bg-secondary"
              />
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
