import { FileCode, Upload, Github } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Implementation() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <SectionHeader
        icon={FileCode}
        title="Implementation"
        description="Provide access to your source code and key code snippets"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Source Code Repository</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub/GitLab Repository URL</Label>
              <div className="flex gap-2">
                <Input
                  id="githubUrl"
                  placeholder="https://github.com/username/project"
                  className="bg-secondary"
                />
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Recommended: Provide a link to your repository instead of pasting code
              </p>
            </div>

            <div className="space-y-2">
              <Label>Or Upload Project Files</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  ZIP file of your project (Max 50MB)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Code Snippets (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Include 2-3 important code snippets that demonstrate critical functionality
            </p>

            <div className="space-y-2">
              <Label htmlFor="snippet1Title">Snippet 1 - Title</Label>
              <Input
                id="snippet1Title"
                placeholder="e.g., Binary Search Tree Implementation"
                className="bg-secondary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="snippet1Code">Code</Label>
              <Textarea
                id="snippet1Code"
                placeholder="Paste your code snippet here..."
                rows={12}
                className="bg-secondary font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="snippet1Description">Description</Label>
              <Textarea
                id="snippet1Description"
                placeholder="Explain what this code does and why it's important..."
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
