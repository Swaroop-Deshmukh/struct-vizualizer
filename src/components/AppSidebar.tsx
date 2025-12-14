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
  DollarSign,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const passengerItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Book Ride", url: "/book", icon: MapPin },
  { title: "Find Shares", url: "/shares", icon: Users },
  { title: "My Rides", url: "/rides", icon: Car },
  { title: "Wallet", url: "/wallet", icon: Wallet },
  { title: "Eco Impact", url: "/eco", icon: Leaf },
];

const driverItems = [
  { title: "Dashboard", url: "/driver", icon: Car },
  { title: "Earnings", url: "/driver/earnings", icon: DollarSign },
  { title: "My Rides", url: "/driver/rides", icon: History },
];

const generalItems = [
  { title: "Safety", url: "/safety", icon: Shield },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isDriver, isPassenger, signOut } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  // Show driver menu if user is a driver AND on driver routes
  // Show passenger menu if user is a passenger OR on passenger routes
  const isDriverMode = isDriver && currentPath.startsWith("/driver");

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

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
              <p className="text-xs text-muted-foreground">
                {isDriverMode ? "Driver Mode" : "Passenger"}
              </p>
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
        {/* Show passenger menu when NOT in driver mode */}
        {!isDriverMode && (
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
        )}

        {isDriverMode && (
          <SidebarGroup>
            <SidebarGroupLabel>Driver</SidebarGroupLabel>
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
        )}

        {/* Mode Switch */}
        {isDriver && (
          <SidebarGroup>
            <SidebarGroupLabel>Switch Mode</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={isDriverMode ? "/" : "/driver"} 
                      className="flex items-center gap-3"
                    >
                      {isDriverMode ? <User className="h-4 w-4" /> : <Car className="h-4 w-4" />}
                      <span>{isDriverMode ? "Passenger Mode" : "Driver Mode"}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

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
        {state !== "collapsed" ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt={displayName} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground">
                  {isDriver ? "Driver" : "Passenger"}
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-muted-foreground hover:text-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Avatar className="h-9 w-9 mx-auto">
            <AvatarImage src="" alt={displayName} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
