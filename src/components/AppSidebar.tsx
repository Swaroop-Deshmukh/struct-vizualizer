import { 
  FileText, 
  Info, 
  Code2, 
  Database, 
  FileCode, 
  BarChart3, 
  BookOpen, 
  Library 
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Title Page", url: "/", icon: FileText },
  { title: "Introduction", url: "/introduction", icon: Info },
  { title: "Tech Stack", url: "/tech-stack", icon: Code2 },
  { title: "Data Structures & Algorithms", url: "/ds-algo", icon: Database },
  { title: "Implementation", url: "/implementation", icon: FileCode },
  { title: "Results", url: "/results", icon: BarChart3 },
  { title: "Conclusion", url: "/conclusion", icon: BookOpen },
  { title: "References", url: "/references", icon: Library },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        {state !== "collapsed" && (
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-sm font-semibold text-sidebar-foreground">DS Project Report</h2>
              <p className="text-xs text-muted-foreground">Data Structures & Algorithms</p>
            </div>
          </div>
        )}
        {state === "collapsed" && (
          <Database className="h-6 w-6 text-primary mx-auto" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Report Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink 
                      to={item.url} 
                      end
                      className="flex items-center gap-3"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
