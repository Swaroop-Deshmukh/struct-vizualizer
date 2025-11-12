import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export function SectionHeader({ icon: Icon, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground ml-9">{description}</p>
      )}
    </div>
  );
}
