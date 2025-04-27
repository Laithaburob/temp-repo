import React from "react";
import { Communication } from "@/types/messages";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCommunicationStyles } from "@/hooks/useCommunicationStyles";
import { useMessageFormatting } from "@/hooks/useMessageFormatting";
import { Star, Calendar } from "lucide-react";

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
  handleToggleStar,
}: MessageListProps) => {
  const { getCommunicationTypeIcon, getTypeBadgeColor } =
    useCommunicationStyles();
  const { formatDate, formatTimestamp } = useMessageFormatting();

  return (
    <div className="flex-1 overflow-y-auto border-r border-border">
      {/* Search and filters */}
      <div className="px-4 py-2">
        <Input type="search" placeholder="Search messages..." />
      </div>

      {/* Message list */}
      <div>
        {communications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No messages found.
          </div>
        ) : (
          communications.map((communication) => (
            <div
              key={communication.id}
              className={`px-4 py-3 transition-colors cursor-pointer ${
                activeCommunication === communication.id
                  ? "bg-muted/50"
                  : "hover:bg-muted/20"
              } ${communication.isRead ? "opacity-75" : "opacity-100"}`}
              onClick={() => {
                setActiveCommunication(communication.id);
                handleMarkAsRead(communication.id);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    {communication.sender.avatar ? (
                      <AvatarImage
                        src={communication.sender.avatar}
                        alt={communication.sender.name}
                      />
                    ) : (
                      <AvatarFallback>
                        {communication.sender.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="text-sm font-medium">{communication.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {communication.sender.name} •{" "}
                      {formatTimestamp(communication.timestamp)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {communication.isStarred && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStar(communication.id);
                      }}
                    >
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </Button>
                  )}

                  {communication.dueDate && communication.type === "assignment" && (
                    <Badge variant="outline" className="gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      Due {formatDate(communication.dueDate)}
                    </Badge>
                  )}

                  <Badge
                    variant="outline"
                    className={getTypeBadgeColor(communication.type)}
                  >
                    {communication.type.charAt(0).toUpperCase() +
                      communication.type.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
