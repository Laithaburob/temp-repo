"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

interface Comment {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string | null;
    role: string;
  };
  content: string;
  timestamp: string;
}

interface Attachment {
  id: number;
  name: string;
  type: string;
  size: string;
}

interface Communication {
  id: string;
  type: string;
  title: string;
  sender: {
    id: string;
    name: string;
    avatar: string | null;
    role: string;
    department: string;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  isPinned: boolean;
  course: string;
  attachments: Attachment[];
  comments: Comment[];
  dueDate?: string;
  status?: string;
  eventDate?: string;
}

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

const userProfile = {
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

const communicationTypes = [
  { id: "all", name: "All", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "assignment", name: "Assignments", icon: <FileText className="h-4 w-4" /> },
  { id: "announcement", name: "Announcements", icon: <Bell className="h-4 w-4" /> },
  { id: "discussion", name: "Discussions", icon: <Users className="h-4 w-4" /> },
  { id: "message", name: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "resource", name: "Resources", icon: <BookOpen className="h-4 w-4" /> },
  { id: "starred", name: "Starred", icon: <Star className="h-4 w-4" /> }
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [communications, setCommunications] = useState<Communication[]>(communicationsData);
  const [filteredCommunications, setFilteredCommunications] = useState<Communication[]>(communicationsData);
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [composeType, setComposeType] = useState("message");
  const [composeTitle, setComposeTitle] = useState("");
  const [composeContent, setComposeContent] = useState("");
  const [composeRecipient, setComposeRecipient] = useState("");
  const [composeCourse, setComposeCourse] = useState("");
  const [composeDueDate, setComposeDueDate] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let filtered = communications;
    
    if (activeType === "starred") {
      filtered = filtered.filter(comm => comm.isStarred);
    } else if (activeType !== "all") {
      filtered = filtered.filter(comm => comm.type === activeType);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(comm => 
        comm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comm.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredCommunications(filtered);
  }, [searchQuery, communications, activeType]);

  useEffect(() => {
    if (activeCommunication && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeCommunication]);

  const handleCreateCommunication = () => {
    if (!composeTitle.trim() || !composeContent.trim() || !composeRecipient) return;
    
    const newCommunication: Communication = {
      id: `c${communications.length + 1}`,
      type: composeType,
      title: composeTitle,
      sender: {
        id: userProfile.id,
        name: userProfile.name,
        avatar: userProfile.avatar,
        role: userProfile.role,
        department: userProfile.department,
      },
      content: composeContent,
      timestamp: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      isPinned: false,
      course: composeCourse || "General",
      attachments: attachments,
      comments: [],
      ...(composeType === "assignment" && { dueDate: composeDueDate }),
      ...(composeType === "assignment" && { status: "pending" }),
    };
    
    setCommunications([...communications, newCommunication]);
    setComposeType("message");
    setComposeTitle("");
    setComposeContent("");
    setComposeRecipient("");
    setComposeCourse("");
    setComposeDueDate("");
    setAttachments([]);
    setShowComposeDialog(false);
  };

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
    
    setCommunications(communications.map(comm => {
      if (comm.id === commId) {
        const newCommentObj = {
          id: `co${comm.comments.length + 1}`,
          sender: userProfile,
          content: newComment,
          timestamp: new Date().toISOString(),
        };
        return {
          ...comm,
          comments: [...comm.comments, newCommentObj]
        };
      }
      return comm;
    }));
    
    setNewComment("");
  };

  const getActiveCommunication = () => {
    return communications.find(comm => comm.id === activeCommunication);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCommunicationTypeIcon = (type: string) => {
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

  const getTypeBadgeColor = (type: string) => {
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
        <div className="w-64 border-r border-border flex flex-col overflow-hidden">
          <div className="p-4">
            <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
              <DialogTrigger asChild>
                <Button className="w-full bg-[#45f0df] text-primary hover:bg-[#32d8c8]">
                  <Plus className="mr-2 h-4 w-4" />
                  New Message
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Create New Communication</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                    <label htmlFor="type" className="text-sm font-medium">Type:</label>
                    <Select value={composeType} onValueChange={setComposeType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="message">Message</SelectItem>
                        <SelectItem value="assignment">Assignment</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                        <SelectItem value="discussion">Discussion</SelectItem>
                        <SelectItem value="resource">Resource</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                    <label htmlFor="recipient" className="text-sm font-medium">Recipient:</label>
                    <Select value={composeRecipient} onValueChange={setComposeRecipient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Select recipient</SelectItem>
                        {contacts.map(contact => (
                          <SelectItem key={contact.id} value={contact.id}>
                            {contact.name} ({contact.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                    <label htmlFor="course" className="text-sm font-medium">Course:</label>
                    <Select value={composeCourse} onValueChange={setComposeCourse}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        {userProfile.courses.map(course => (
                          <SelectItem key={course.id} value={course.name}>
                            {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {composeType === "assignment" && (
                    <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                      <label htmlFor="dueDate" className="text-sm font-medium">Due Date:</label>
                      <Input 
                        id="dueDate" 
                        type="datetime-local" 
                        value={composeDueDate}
                        onChange={(e) => setComposeDueDate(e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-[150px_1fr] items-center gap-2">
                    <label htmlFor="title" className="text-sm font-medium">Title:</label>
                    <Input 
                      id="title" 
                      value={composeTitle}
                      onChange={(e) => setComposeTitle(e.target.value)}
                      placeholder="Enter title..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Content:</label>
                    <Textarea 
                      id="message"
                      value={composeContent}
                      onChange={(e) => setComposeContent(e.target.value)}
                      placeholder="Type your message here..."
                      className="min-h-[200px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Attachments:</label>
                    <Button variant="outline" className="w-full justify-start gap-2" type="button">
                      <Paperclip className="h-4 w-4" />
                      Add Attachment
                    </Button>
                    {attachments.length > 0 && (
                      <div className="space-y-2 mt-2">
                        {attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded bg-muted">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm flex-1 truncate">{attachment.name}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-6 w-6 p-0 rounded-full"
                              onClick={() => {
                                const newAttachments = [...attachments];
                                newAttachments.splice(index, 1);
                                setAttachments(newAttachments);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowComposeDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-[#45f0df] text-primary hover:bg-[#32d8c8]"
                    onClick={handleCreateCommunication}
                    disabled={!composeTitle.trim() || !composeContent.trim() || !composeRecipient}
                  >
                    Send
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                      {communications.length}
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
                      
                      <p className="text-xs text-muted-foreground truncate mt-1 max-w-full">
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
        
        <div className={`${activeCommunication ? 'flex' : 'hidden md:flex'} flex-1 flex-col overflow-hidden`}>
          {activeCommunication ? (
            <>
              <div className="p-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2 md:hidden">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setActiveCommunication(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleToggleStar(activeCommunication)}
                    title={getActiveCommunication()?.isStarred ? "Unstar" : "Star"}
                  >
                    <Star className={`h-4 w-4 ${getActiveCommunication()?.isStarred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteCommunication(activeCommunication)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Mark as Unread</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Pin Item</span>
                      </DropdownMenuItem>
                      {getActiveCommunication()?.type === "assignment" && (
                        <DropdownMenuItem>
                          <PenLine className="mr-2 h-4 w-4" />
                          <span>Submit Assignment</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {getActiveCommunication()?.type === "assignment" && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="ml-auto"
                  >
                    <PenLine className="mr-2 h-4 w-4" />
                    Submit Assignment
                  </Button>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto p-4" ref={contentRef}>
                <div className="max-w-3xl mx-auto space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl font-bold">{getActiveCommunication()?.title}</h1>
                      <Badge 
                        variant="outline" 
                        className={`${getTypeBadgeColor(getActiveCommunication()?.type || "")}`}
                      >
                        {getActiveCommunication()?.type.charAt(0).toUpperCase() + getActiveCommunication()?.type.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <span>{getActiveCommunication()?.course}</span>
                      {getActiveCommunication()?.type === "assignment" && getActiveCommunication()?.dueDate && (
                        <span className="ml-4 flex items-center gap-1 inline-flex">
                          <Calendar className="h-4 w-4" />
                          Due: {formatDate(getActiveCommunication()?.dueDate || "")}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getActiveCommunication()?.sender.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{getActiveCommunication()?.sender.name}</span>
                        {getActiveCommunication()?.sender.role === "Professor" && (
                          <Badge className="bg-[#45f0df]/20 text-[#45f0df]">Professor</Badge>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {formatDate(getActiveCommunication()?.timestamp || "")} at {new Date(getActiveCommunication()?.timestamp || "").toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {getActiveCommunication()?.content.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                  
                  {getActiveCommunication()?.type === "assignment" && (
                    <Card className="mt-6">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Assignment Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <Badge variant="outline" className={
                                getActiveCommunication()?.status === "submitted" 
                                  ? "bg-yellow-500/10 text-yellow-500" 
                                  : getActiveCommunication()?.status === "graded"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-blue-500/10 text-blue-500"
                              }>
                                {getActiveCommunication()?.status === "submitted" 
                                  ? "Submitted" 
                                  : getActiveCommunication()?.status === "graded"
                                    ? "Graded"
                                    : "Pending"}
                              </Badge>
                              <span className="text-sm text-muted-foreground">Submission deadline: {formatDate(getActiveCommunication()?.dueDate || "")}</span>
                            </div>
                            
                            <Button size="sm" className="bg-[#45f0df] text-primary hover:bg-[#32d8c8]">
                              <PenLine className="mr-2 h-4 w-4" />
                              Submit Work
                            </Button>
                          </div>
                          
                          <Progress value={0} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {getActiveCommunication()?.attachments && getActiveCommunication()?.attachments.length > 0 && (
                    <div className="border border-border rounded-md p-4">
                      <h3 className="text-sm font-medium mb-3">Attachments</h3>
                      <div className="space-y-2">
                        {getActiveCommunication()?.attachments.map((attachment) => (
                          <div 
                            key={attachment.id}
                            className="flex items-center gap-3 p-2 rounded bg-muted/30 hover:bg-muted/50 transition-colors"
                          >
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{attachment.size}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t border-border pt-6 mt-6">
                    <h3 className="text-sm font-medium mb-3">Comments ({getActiveCommunication()?.comments.length || 0})</h3>
                    
                    {getActiveCommunication()?.comments && getActiveCommunication()?.comments.length > 0 ? (
                      <div className="space-y-4 mb-4">
                        {getActiveCommunication()?.comments.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{comment.sender.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="bg-muted/30 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{comment.sender.name}</span>
                                    {comment.sender.role === "Professor" && (
                                      <Badge className="h-5 text-xs bg-[#45f0df]/20 text-[#45f0df]">
                                        Professor
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {formatTimestamp(comment.timestamp)}
                                  </span>
                                </div>
                                
                                <p className="text-sm">{comment.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-4">No comments yet. Be the first to comment!</p>
                    )}
                    
                    <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{userProfile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 flex gap-2">
                        <Input 
                          placeholder="Add a comment..." 
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1"
                        />
                        
                        <Button 
                          onClick={() => handleAddComment(activeCommunication)}
                          disabled={!newComment.trim()}
                          className="bg-[#45f0df] text-primary hover:bg-[#32d8c8]"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-card rounded-full p-6 mb-4">
                <MessageSquare className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">Select a communication</h3>
              <p className="text-muted-foreground max-w-md">
                Choose an item from the list or create a new message, assignment, or announcement.
              </p>
              <Button 
                className="mt-4 bg-[#45f0df] text-primary hover:bg-[#32d8c8]"
                onClick={() => setShowComposeDialog(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Communication
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
