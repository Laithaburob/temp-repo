
import { useState } from "react";
import { Communication } from "@/types/messages";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Bookmark, MessageSquare, Paperclip, Calendar } from "lucide-react";
import { useMessageFormatting } from "@/hooks/useMessageFormatting";
import { useCommunicationStyles } from "@/hooks/useCommunicationStyles";

interface MessageListProps {
  communications: Communication[];
  activeCommunication: string | null;
  setActiveCommunication: (id: string | null) => void;
  handleMarkAsRead: (id: string) => void;
  handleToggleStar: (id: string) => void;
}

export const MessageList = ({
  communications,
  activeCommunication,
  setActiveCommunication,
  handleMarkAsRead,
  handleToggleStar
}: MessageListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { formatTimestamp, formatDate } = useMessageFormatting();
  const { getCommunicationTypeIcon, getTypeBadgeColor } = useCommunicationStyles();

  const filteredCommunications = communications.filter(comm => 
    comm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comm.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comm.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`${activeCommunication ? 'hidden md:block' : ''} w-full md:w-1/3 border-r border-border flex flex-col overflow-hidden`}>
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search communications..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredCommunications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No communications found</p>
          </div>
        ) : (
          filteredCommunications.map((comm) => (
            <div 
              key={comm.id}
              className={`p-3 border-b border-border cursor-pointer transition-colors ${
                activeCommunication === comm.id 
                  ? 'bg-muted/40' 
                  : comm.isRead ? 'hover:bg-muted/20' : 'hover:bg-muted/20 bg-muted/5'
              }`}
              onClick={() => {
                setActiveCommunication(comm.id);
                if (!comm.isRead) {
                  handleMarkAsRead(comm.id);
                }
              }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getCommunicationTypeIcon(comm.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${!comm.isRead ? 'font-semibold' : ''}`}>
                      {comm.sender.name}
                    </p>
                    
                    <div className="flex items-center gap-1">
                      {comm.isPinned && (
                        <Bookmark className="h-3 w-3 text-[#45f0df] fill-[#45f0df]" />
                      )}
                      
                      <button 
                        className="text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStar(comm.id);
                        }}
                      >
                        <Star className={`h-3 w-3 ${comm.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </button>
                      
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(comm.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className={`text-sm truncate mt-1 ${!comm.isRead ? 'font-semibold' : ''}`}>
                    {comm.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getTypeBadgeColor(comm.type)}`}
                    >
                      {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                    </Badge>
                    
                    <span className="text-xs text-muted-foreground truncate">
                      {comm.course}
                    </span>
                    
                    {comm.type === "assignment" && comm.dueDate && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                        <Calendar className="h-3 w-3" />
                        {formatDate(comm.dueDate)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    {comm.content.split('\n')[0]}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-1">
                    {comm.attachments.length > 0 && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Paperclip className="h-3 w-3" />
                        {comm.attachments.length}
                      </span>
                    )}
                    
                    {comm.comments.length > 0 && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {comm.comments.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
