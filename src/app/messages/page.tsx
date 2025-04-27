"use client";

import { useState, useRef, useEffect } from "react";
import { UserProfile, Communication, Attachment } from "@/types/messages";
import { MessageSidebar } from "@/components/messages/MessageSidebar";
import { MessageList } from "@/components/messages/MessageList";
import { MessageDetail } from "@/components/messages/MessageDetail";
import { ComposeDialog } from "@/components/messages/ComposeDialog";
import { useMessageFormatting } from "@/hooks/useMessageFormatting";
import { useCommunicationStyles } from "@/hooks/useCommunicationStyles";
import Link from "next/link";
import { 
  ArrowLeft,
  Send,
  Search,
  Plus,
  File,
  Trash2,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  MessageSquare,
  FileText,
  User,
  Users,
  Bookmark,
  Star,
  PenLine,
  Paperclip,
  ChevronDown,
  ChevronRight,
  Download,
  MoreHorizontal,
  Bell,
  Filter,
  Mail,
  Archive,
  Tag,
  Flag,
  Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const communicationsData: Communication[] = [
  {
    id: "c001",
    type: "assignment",
    title: "Neural Network Architectures Assignment",
    sender: {
      id: "prof001",
      name: "Dr. Sarah Chen",
      avatar: "/avatar-1.jpg",
      role: "Professor",
      department: "Computer Science"
    },
    content: "I've posted a new assignment on neural network architectures. The assignment covers CNNs, RNNs, and Transformers. Please complete it by next Friday at 11:59 PM.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: true,
    isStarred: false,
    isPinned: true,
    course: "Machine Learning 101",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    status: "pending",
    attachments: [
      {
        id: 1,
        name: "Neural_Network_Assignment.pdf",
        type: "document",
        size: "1.2 MB",
      }
    ],
    comments: [
      {
        id: "co001",
        sender: {
          id: "student001",
          name: "Alex Johnson", 
          avatar: "/avatar-2.jpg",
          role: "Student",
        },
        content: "Will this assignment cover the attention mechanism we discussed in the last lecture?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      },
      {
        id: "co002",
        sender: {
          id: "prof001",
          name: "Dr. Sarah Chen",
          avatar: "/avatar-1.jpg",
          role: "Professor",
        },
        content: "Yes, Section 3 of the assignment focuses on attention mechanisms, particularly how they're implemented in Transformer models.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      }
    ]
  },
  {
    id: "c002",
    type: "discussion",
    title: "Study Group for Machine Learning Midterm",
    sender: {
      id: "student003",
      name: "Maria Rodriguez",
      avatar: "/avatar-3.jpg",
      role: "Student",
      department: "Computer Science"
    },
    content: "I'm organizing a study group for the upcoming Machine Learning midterm. Would anyone like to join? I'm thinking we could meet in the library this Saturday at 2 PM.\n\nI've been working through some practical examples and created this notebook with visualizations of different attention patterns that might be helpful for the exam.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    isRead: false,
    isStarred: true,
    isPinned: false,
    course: "Machine Learning 101",
    attachments: [
      {
        id: 2,
        name: "Attention_Visualization.ipynb",
        type: "notebook",
        size: "4.5 MB",
      }
    ],
    comments: []
  },
  {
    id: "c003",
    type: "announcement",
    title: "Virtual Study Session - Tomorrow 4PM",
    sender: {
      id: "prof001",
      name: "Dr. Sarah Chen",
      avatar: "/avatar-1.jpg",
      role: "Professor",
      department: "Computer Science"
    },
    content: "I've scheduled an optional virtual study session for tomorrow at 4 PM to go over any questions about the assignment. The link will be posted in the classroom.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    isRead: false,
    isStarred: false,
    isPinned: true,
    course: "Machine Learning 101",
    eventDate: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(),
    attachments: [],
    comments: []
  },
  {
    id: "c004",
    type: "message",
    title: "Reference Paper for Neural Networks Lecture",
    sender: {
      id: "student007",
      name: "Michael Brown",
      avatar: "/avatar-6.jpg",
      role: "Student",
      department: "Computer Science"
    },
    content: "Do you have the reference paper from the Neural Networks lecture? I missed that class and I'm trying to catch up on the material.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    isRead: true,
    isStarred: false,
    isPinned: false,
    course: "Machine Learning 101",
    attachments: [],
    comments: []
  },
  {
    id: "c005",
    type: "resource",
    title: "Class Notes - Deep Learning Lecture",
    sender: {
      id: "student005",
      name: "Emily Davis",
      avatar: "/avatar-5.jpg",
      role: "Student",
      department: "Computer Science"
    },
    content: "I'm sharing my notes from yesterday's lecture on deep learning architectures. Hope you find them useful!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    isRead: true,
    isStarred: true,
    isPinned: false,
    course: "Machine Learning 101",
    attachments: [
      {
        id: 3,
        name: "Deep_Learning_Notes.pdf",
        type: "document",
        size: "2.8 MB",
      }
    ],
    comments: []
  }
];

const userProfile: UserProfile = {
  id: "student001",
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  role: "Student",
  department: "Computer Science",
  avatar: "/avatar-2.jpg",
  courses: [
    { id: "course001", name: "Machine Learning 101" },
    { id: "course002", name: "Data Structures & Algorithms" },
    { id: "course003", name: "Web Development Fundamentals" }
  ]
};

const contacts = [
  {
    id: "prof001",
    name: "Dr. Sarah Chen",
    email: "s.chen@university.edu",
    role: "Professor",
    department: "Computer Science",
    avatar: "/avatar-1.jpg"
  },
  {
    id: "prof002",
    name: "Dr. James Wilson",
    email: "j.wilson@university.edu",
    role: "Professor",
    department: "Computer Science",
    avatar: "/avatar-4.jpg"
  },
  {
    id: "student003",
    name: "Maria Rodriguez",
    email: "m.rodriguez@university.edu",
    role: "Student",
    department: "Computer Science",
    avatar: "/avatar-3.jpg"
  },
  {
    id: "student004",
    name: "David Lee",
    email: "d.lee@university.edu",
    role: "Student",
    department: "Computer Science",
    avatar: null
  },
  {
    id: "student005",
    name: "Emily Davis",
    email: "e.davis@university.edu",
    role: "Student",
    department: "Computer Science",
    avatar: "/avatar-5.jpg"
  },
  {
    id: "class001",
    name: "Machine Learning 101",
    email: "ml101@university.edu",
    role: "Class",
    department: "Computer Science",
    avatar: null,
    members: 25
  },
];

export default function Messages() {
  const [activeType, setActiveType] = useState("all");
  const [activeCommunication, setActiveCommunication] = useState<string | null>(null);
  const [communications, setCommunications] = useState<Communication[]>(communicationsData);
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [composeType, setComposeType] = useState("message");
  const [composeTitle, setComposeTitle] = useState("");
  const [composeContent, setComposeContent] = useState("");
  const [composeRecipient, setComposeRecipient] = useState("");
  const [composeCourse, setComposeCourse] = useState("");
  const [composeDueDate, setComposeDueDate] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [newComment, setNewComment] = useState("");
  const contentRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  const handleMarkAsRead = (commId: string) => {
    setCommunications(communications.map(comm => 
      comm.id === commId ? { ...comm, isRead: true } : comm
    ));
  };

  const handleToggleStar = (commId: string) => {
    setCommunications(communications.map(comm => 
      comm.id === commId ? { ...comm, isStarred: !comm.isStarred } : comm
    ));
  };

  const handleDeleteCommunication = (commId: string) => {
    setCommunications(communications.filter(comm => comm.id !== commId));
    if (activeCommunication === commId) {
      setActiveCommunication(null);
    }
  };

  const handleAddComment = (commId: string) => {
    if (!newComment.trim()) return;
    
    setCommunications(prevCommunications => 
      prevCommunications.map(comm => {
        if (comm.id === commId) {
          const newCommentObj = {
            id: `co${comm.comments ? comm.comments.length + 1 : 1}`,
            sender: {
              id: userProfile.id,
              name: userProfile.name,
              avatar: userProfile.avatar || null,
              role: userProfile.role,
            },
            content: newComment,
            timestamp: new Date().toISOString(),
          };
          return {
            ...comm,
            comments: comm.comments ? [...comm.comments, newCommentObj] : [newCommentObj]
          };
        }
        return comm;
      })
    );
    
    setNewComment("");
  };

  const handleCreateCommunication = (newCommunication: Communication) => {
    setCommunications([...communications, newCommunication]);
  };

  const filteredCommunications = activeType === "starred" 
    ? communications.filter(comm => comm.isStarred)
    : activeType === "all" 
      ? communications 
      : communications.filter(comm => comm.type === activeType);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="px-6 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Academic Communications</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 bg-[#45f0df]/10 text-[#45f0df]">
            <Bell className="h-3 w-3" />
            <span>3 Unread</span>
          </Badge>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <MessageSidebar
          userProfile={userProfile}
          activeType={activeType}
          setActiveType={setActiveType}
          setActiveCommunication={setActiveCommunication}
          setShowComposeDialog={setShowComposeDialog}
          communicationsCount={communications.length}
        />
        
        <MessageList
          communications={filteredCommunications}
          activeCommunication={activeCommunication}
          setActiveCommunication={setActiveCommunication}
          handleMarkAsRead={handleMarkAsRead}
          handleToggleStar={handleToggleStar}
        />
        
        <MessageDetail
          activeCommunication={
            communications.find(comm => comm.id === activeCommunication) || null
          }
          contentRef={contentRef}
          userProfile={userProfile}
          handleToggleStar={() => {
            const activeCommunicationObj = communications.find(comm => comm.id === activeCommunication);
            if (activeCommunicationObj) {
              handleToggleStar(activeCommunicationObj.id);
            }
          }}
          handleDeleteCommunication={() => {
            if (activeCommunication) {
              handleDeleteCommunication(activeCommunication);
            }
          }}
          handleAddComment={(commentContent: string) => {
            if (activeCommunication) {
              handleAddComment(activeCommunication);
            }
          }}
          newComment={newComment}
          setNewComment={setNewComment}
        />

        <ComposeDialog
          showComposeDialog={showComposeDialog}
          setShowComposeDialog={setShowComposeDialog}
          composeType={composeType}
          setComposeType={setComposeType}
          composeTitle={composeTitle}
          setComposeTitle={setComposeTitle}
          composeContent={composeContent}
          setComposeContent={setComposeContent}
          composeRecipient={composeRecipient}
          setComposeRecipient={setComposeRecipient}
          composeCourse={composeCourse}
          setComposeCourse={setComposeCourse}
          composeDueDate={composeDueDate}
          setComposeDueDate={setComposeDueDate}
          attachments={attachments}
          setAttachments={setAttachments}
          userProfile={userProfile}
          contacts={contacts}
          communications={communications}
          setCommunications={setCommunications}
        />
      </div>
    </div>
  );
}
