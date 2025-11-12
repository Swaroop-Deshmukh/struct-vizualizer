import { 
  Database, 
  Table2, 
  Search, 
  BarChart3, 
  FileJson, 
  Settings,
  Plus
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
import { Button } from "@/components/ui/button";

const items = [
  { title: "Dashboard", url: "/", icon: Database },
  { title: "Collections", url: "/collections", icon: Table2 },
  { title: "Query", url: "/query", icon: Search },
  { title: "Schema", url: "/schema", icon: FileJson },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
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
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground">DataStructure DB</h2>
                <p className="text-xs text-muted-foreground">Local Instance</p>
              </div>
            </div>
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Collection
            </Button>
          </div>
        )}
        {state === "collapsed" && (
          <Database className="h-6 w-6 text-primary mx-auto" />
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
