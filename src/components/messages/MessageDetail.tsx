
"use client";

import React, { RefObject } from "react";
import { Communication, UserProfile } from "@/types/messages";

// UI primitives
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Icons
import {
  Star,
  MoreHorizontal,
  ArrowLeft,
  Reply,
  Trash2,
  Download,
  Calendar,
  Paperclip,
  Send,
  MessageSquare,
} from "lucide-react";

// Hooks
import { useMessageFormatting } from "@/hooks/useMessageFormatting";
import { useCommunicationStyles } from "@/hooks/useCommunicationStyles";

interface MessageDetailProps {
  activeCommunication: Communication | null;
  contentRef: RefObject<HTMLDivElement>;
  userProfile: UserProfile;
  handleToggleStar: () => void;
  handleDeleteCommunication: () => void;
  handleAddComment: (comment: string) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
}

export const MessageDetail = ({
  activeCommunication,
  contentRef,
  userProfile,
  handleToggleStar,
  handleDeleteCommunication,
  handleAddComment,
  newComment,
  setNewComment,
}: MessageDetailProps) => {
  const { formatDate, formatTimestamp } = useMessageFormatting();
  const { getCommunicationTypeIcon, getTypeBadgeColor } =
    useCommunicationStyles();

  /* ──────────────────────────────────────────────────────────────── */
  /*  Empty state                                                    */
  /* ──────────────────────────────────────────────────────────────── */
  if (!activeCommunication) {
    return (
      <div className="hidden md:flex md:flex-1 md:flex-col md:items-center md:justify-center md:p-8 text-center">
        <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">
          No communication selected
        </h2>
        <p className="text-muted-foreground">
          Select a communication to view its details.
        </p>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────── */
  /*  Details view                                                   */
  /* ──────────────────────────────────────────────────────────────── */
  return (
    <div
      className={`${
        activeCommunication ? "flex" : "hidden md:flex"
      } flex-1 flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <h2 className="font-semibold truncate max-w-[250px] md:max-w-md">
            {activeCommunication.title}
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleStar}
          >
            <Star
              className={`h-5 w-5 ${
                activeCommunication.isStarred
                  ? "fill-yellow-400 text-yellow-400"
                  : ""
              }`}
            />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleDeleteCommunication}
                className="text-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4" ref={contentRef}>
        {/* Sender block */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-10 w-10">
            {activeCommunication.sender.avatar ? (
              <AvatarImage
                src={activeCommunication.sender.avatar}
                alt={activeCommunication.sender.name}
              />
            ) : (
              <AvatarFallback>
                {activeCommunication.sender.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1">
            {/* Sender header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">
                  {activeCommunication.sender.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeCommunication.sender.role} •{" "}
                  {formatTimestamp(activeCommunication.timestamp)}
                </p>
              </div>

              <Badge
                variant="outline"
                className={getTypeBadgeColor(activeCommunication.type)}
              >
                {activeCommunication.type
                  .charAt(0)
                  .toUpperCase() +
                  activeCommunication.type.slice(1)}
              </Badge>
            </div>

            {/* Main content */}
            <div className="mt-4 text-sm whitespace-pre-wrap">
              {activeCommunication.content}
            </div>

            {/* Assignment due-date card */}
            {activeCommunication.type === "assignment" &&
              activeCommunication.dueDate && (
                <Card className="mt-4 bg-muted/30">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#45f0df]" />
                      Due Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 text-sm">
                    {formatDate(activeCommunication.dueDate)}
                  </CardContent>
                </Card>
              )}

            {/* Attachments */}
            {activeCommunication.attachments.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Attachments</h3>
                <div className="space-y-2">
                  {activeCommunication.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-2 p-2 border border-border rounded-md bg-muted/20"
                    >
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm flex-1 truncate">
                        {attachment.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {attachment.size}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comments */}
        {activeCommunication.comments.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Comments</h3>
            <div className="space-y-4">
              {activeCommunication.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    {comment.sender.avatar ? (
                      <AvatarImage
                        src={comment.sender.avatar}
                        alt={comment.sender.name}
                      />
                    ) : (
                      <AvatarFallback>
                        {comment.sender.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-medium">
                        {comment.sender.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(comment.timestamp)}
                      </p>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Comment composer */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            {userProfile.avatar ? (
              <AvatarImage
                src={userProfile.avatar}
                alt={userProfile.name}
              />
            ) : (
              <AvatarFallback>
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1 flex">
            <Textarea
              className="flex-1 min-h-[40px] resize-none"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <Button
              className="ml-2"
              size="icon"
              onClick={() => handleAddComment(newComment)}
              disabled={!newComment.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
