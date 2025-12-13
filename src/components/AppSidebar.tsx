import { 
  Home,
  MapPin,
  Car,
  Wallet,
  Leaf,
  History,
  User,
  Settings,
  Shield,
  Users,
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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const passengerItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Book Ride", url: "/book", icon: MapPin },
  { title: "Find Shares", url: "/shares", icon: Users },
  { title: "My Rides", url: "/rides", icon: Car },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Eco Impact", url: "/eco", icon: Leaf },
];

const driverItems = [
  { title: "Driver Dashboard", url: "/driver", icon: Car },
  { title: "Earnings", url: "/earnings", icon: Wallet },
];

const generalItems = [
  { title: "Ride History", url: "/history", icon: History },
  { title: "Safety", url: "/safety", icon: Shield },
  { title: "Profile", url: "/profile", icon: User },
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
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
              <Car className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-sidebar-foreground">Sharka</h1>
              <p className="text-xs text-muted-foreground">Share • Save • Sustain</p>
            </div>
          </div>
        )}
        {state === "collapsed" && (
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center mx-auto">
            <Car className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Passenger</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {passengerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink 
                      to={item.url} 
                      end
                      className="flex items-center gap-3"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.title === "Eco Impact" && state !== "collapsed" && (
                        <Badge variant="secondary" className="ml-auto text-xs bg-eco/10 text-eco">
                          New
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Driver Mode</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {driverItems.map((item) => (
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

        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalItems.map((item) => (
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

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {state !== "collapsed" && (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground">4.9 ★ • 120 rides</p>
            </div>
          </div>
        )}
        {state === "collapsed" && (
          <Avatar className="h-9 w-9 mx-auto">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              JD
            </AvatarFallback>
          </Avatar>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
