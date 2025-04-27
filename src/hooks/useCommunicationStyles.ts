
import { FileText, Bell, Users, MessageSquare, BookOpen } from "lucide-react";

export const useCommunicationStyles = () => {
  const getCommunicationTypeIcon = (type?: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "announcement":
        return <Bell className="h-5 w-5 text-blue-500" />;
      case "discussion":
        return <Users className="h-5 w-5 text-green-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case "resource":
        return <BookOpen className="h-5 w-5 text-amber-500" />;
      default:
        return <MessageSquare className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeBadgeColor = (type?: string) => {
    switch (type) {
      case "assignment":
        return "bg-red-500/10 text-red-500 border-red-500/30";
      case "announcement":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "discussion":
        return "bg-green-500/10 text-green-500 border-green-500/30";
      case "message":
        return "bg-purple-500/10 text-purple-500 border-purple-500/30";
      case "resource":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
    }
  };

  return { getCommunicationTypeIcon, getTypeBadgeColor };
};
