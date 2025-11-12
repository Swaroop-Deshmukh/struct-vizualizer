import { FileText } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function TitlePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <SectionHeader
        icon={FileText}
        title="Title Page"
        description="Define your project's basic information and team members"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title</Label>
              <Input
                id="projectTitle"
                placeholder="e.g., Library Management System"
                className="bg-secondary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  defaultValue="Data Structures and Algorithms"
                  className="bg-secondary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="groupNumber">Group Number/Name</Label>
                <Input
                  id="groupNumber"
                  placeholder="e.g., Group 5"
                  className="bg-secondary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Institution Name</Label>
              <Input
                id="institution"
                placeholder="Your University/College Name"
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="submissionDate">Date of Submission</Label>
              <Input
                id="submissionDate"
                type="date"
                className="bg-secondary"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Group Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Team Members</Label>
              <Textarea
                placeholder="Member 1 Name (Student ID)&#10;Member 2 Name (Student ID)&#10;Member 3 Name (Student ID)"
                rows={6}
                className="bg-secondary font-mono text-sm"
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
