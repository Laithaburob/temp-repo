
import { UserProfile } from "@/types/messages";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Home, Inbox, Calendar, Search, Settings, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MessageSidebarProps {
  userProfile: UserProfile;
  activeType: string;
  setActiveType: (type: string) => void;
  setActiveCommunication: (id: string | null) => void;
  setShowComposeDialog: (show: boolean) => void;
  communicationsCount: number;
}

export const MessageSidebar = ({
  userProfile,
  activeType,
  setActiveType,
  setActiveCommunication,
  setShowComposeDialog,
  communicationsCount
}: MessageSidebarProps) => {
  const communicationTypes = [
    { id: "all", name: "All", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "assignment", name: "Assignments", icon: <Home className="h-4 w-4" /> },
    { id: "announcement", name: "Announcements", icon: <Bell className="h-4 w-4" /> },
    { id: "discussion", name: "Discussions", icon: <Users className="h-4 w-4" /> },
    { id: "message", name: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "resource", name: "Resources", icon: <BookOpen className="h-4 w-4" /> },
    { id: "starred", name: "Starred", icon: <Star className="h-4 w-4" /> }
  ];

  return (
    <div className="w-64 border-r border-border flex flex-col overflow-hidden">
      <div className="p-4">
        <Button 
          className="w-full bg-[#45f0df] text-primary hover:bg-[#32d8c8]"
          onClick={() => setShowComposeDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>
      
      <div className="px-3 py-2">
        <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-2">COMMUNICATION</h2>
        <nav className="space-y-1">
          {communicationTypes.map((type) => (
            <button
              key={type.id}
              className={`w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors ${
                activeType === type.id 
                  ? 'bg-muted/40 font-medium' 
                  : 'hover:bg-muted/20'
              }`}
              onClick={() => {
                setActiveType(type.id);
                setActiveCommunication(null);
              }}
            >
              <span className="text-muted-foreground">{type.icon}</span>
              <span>{type.name}</span>
              {type.id === "all" && (
                <Badge variant="outline" className="ml-auto">
                  {communicationsCount}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="px-3 py-2 border-t border-border mt-2">
        <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-2">COURSES</h2>
        <div className="space-y-1">
          {userProfile.courses.map((course) => (
            <button
              key={course.id}
              className="w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-muted/20 transition-colors"
            >
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{course.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto p-3 border-t border-border">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{userProfile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{userProfile.name}</p>
            <p className="text-xs text-muted-foreground truncate">{userProfile.role} • {userProfile.department}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
