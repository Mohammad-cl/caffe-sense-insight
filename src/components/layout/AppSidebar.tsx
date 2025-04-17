
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Home,
  Menu,
  Settings,
  Users,
  User,
  LogOut,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { 
    path: "/dashboard", 
    label: "Dashboard", 
    icon: <Home className="w-5 h-5 mr-2" />,
    requiredRole: "user" 
  },
  { 
    path: "/graphs", 
    label: "Graphs", 
    icon: <BarChart3 className="w-5 h-5 mr-2" />,
    requiredRole: "user" 
  },
  { 
    path: "/admin", 
    label: "Admin", 
    icon: <User className="w-5 h-5 mr-2" />,
    requiredRole: "admin" 
  },
  { 
    path: "/customers", 
    label: "Customers", 
    icon: <Users className="w-5 h-5 mr-2" />,
    requiredRole: "admin" 
  },
  { 
    path: "/settings", 
    label: "Settings", 
    icon: <Settings className="w-5 h-5 mr-2" />,
    requiredRole: "user" 
  }
];

export function AppSidebar() {
  const [expanded, setExpanded] = useState(true);
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle mobile sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setExpanded(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto-collapse on mobile when navigating
  useEffect(() => {
    if (isMobile) setExpanded(false);
  }, [pathname, isMobile]);

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && expanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-50 md:hidden"
        onClick={() => setExpanded(!expanded)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
          expanded ? "w-64" : "w-[70px]",
          isMobile && !expanded && "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-3 gap-2">
          {/* Logo and toggle */}
          <div className="flex items-center justify-between py-2 h-16">
            <div className="flex items-center gap-3 px-2">
              <Coffee className={cn("h-8 w-8 text-caffe-500", !expanded && "mx-auto")} />
              {expanded && (
                <span className="text-xl font-semibold">CaffeSense</span>
              )}
            </div>
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setExpanded(!expanded)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
          </div>

          <Separator />

          {/* Navigation */}
          <div className="flex-1 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                    pathname === item.path 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                    !expanded && "justify-center px-0"
                  )}
                >
                  {item.icon}
                  {expanded && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col gap-2 py-2">
            <Separator />
            <div className={cn("flex items-center", expanded ? "justify-between" : "justify-center")}>
              <ThemeToggle />
              {expanded && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-sidebar-foreground hover:bg-sidebar-accent/50"
                  asChild
                >
                  <Link to="/login">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content wrapper to add padding */}
      <div 
        className={cn(
          "transition-all duration-300 ease-in-out",
          expanded ? "ml-64" : "ml-0 md:ml-[70px]"
        )}
      />
    </>
  );
}
