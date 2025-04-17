"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  Video, 
  MessageSquare, 
  BrainCircuit, 
  Settings, 
  Users,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define navigation items
const mainNavItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "My Courses", href: "/courses", icon: BookOpen },
  { name: "Virtual Classroom", href: "/virtual-classroom", icon: Video },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "AI Tutor", href: "/ai-tutor", icon: BrainCircuit },
  { name: "Community", href: "/community", icon: Users },
  { name: "Calendar", href: "/calendar", icon: Calendar },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };
    
    // Check on initial load
    checkMobile();
    
    // Set up event listener
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar content
  const sidebarContent = (
    <>
      <div className={cn("flex items-center", collapsed ? "justify-center px-3" : "px-6")}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-sidebar-primary" />
            <h1 className="text-xl font-bold">BrainWave</h1>
          </div>
        )}
        {collapsed && (
          <BrainCircuit className="h-8 w-8 text-sidebar-primary" />
        )}
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto p-0 h-8 w-8"
            onClick={toggleCollapse}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <TooltipProvider delayDuration={0}>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Tooltip key={item.name} delayDuration={collapsed ? 100 : 1000}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : 
                        "text-sidebar-foreground hover:bg-sidebar-accent/50",
                        collapsed ? "px-3" : "px-4"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", isActive ? "text-sidebar-primary" : "")} />
                      {!collapsed && <span className="ml-3">{item.name}</span>}
                      {isActive && collapsed && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sidebar-primary rounded-r-full" />
                      )}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="border-sidebar-border">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>

      <div className={cn("mt-auto", collapsed ? "px-3" : "px-4")}>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "w-full border-dashed border-sidebar-primary/70 text-sidebar-primary hover:bg-sidebar-primary/10 hover:text-sidebar-primary mb-4",
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <Sparkles className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Upgrade Plan</span>}
        </Button>
        
        <div className={cn(
          "flex items-center gap-3 py-2 px-2 rounded-lg bg-sidebar-accent/30",
          collapsed ? "flex-col" : ""
        )}>
          <Avatar className="h-8 w-8 border-2 border-sidebar-primary/50">
            <AvatarImage src="/avatar.jpg" alt="User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );

  // If mobile, render responsive sidebar
  if (isMobile) {
    return (
      <>
        {/* Mobile Trigger */}
        <Button 
          variant="ghost" 
          size="icon"
          className="lg:hidden fixed left-4 top-4 z-50 bg-background/80 backdrop-blur-sm"
          onClick={toggleMobileSidebar}
        >
          {mobileOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
        
        {/* Mobile Sidebar - Overlay style */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={toggleMobileSidebar} />
        )}
        
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out transform",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full py-6">
            {sidebarContent}
          </div>
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside
      className={cn(
        "hidden lg:flex h-screen sticky top-0 flex-col border-r border-sidebar-border bg-sidebar py-6 transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {sidebarContent}
    </aside>
  );
} 