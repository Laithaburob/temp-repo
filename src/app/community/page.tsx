"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Users, 
  Search, 
  MessageSquare, 
  Heart, 
  Calendar, 
  Share2, 
  Bookmark, 
  Filter, 
  MoreHorizontal, 
  Plus,
  ArrowUp,
  ArrowDown,
  Star,
  BookOpen,
  GraduationCap,
  Tag,
  Image as ImageIcon,
  Link as LinkIcon,
  AtSign,
  Clock,
  CheckCircle,
  User,
  MapPin,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Mock data for community posts
const postsData = [
  {
    id: "post001",
    title: "Tips for Understanding Neural Network Architectures",
    content: "I've been struggling with understanding the different neural network architectures in our ML class. Here are some resources that have helped me grasp the concepts better:\n\n1. **Visualization tools** - TensorBoard and NetronApp for visualizing model architectures\n2. **Hands-on implementation** - Building simple models from scratch helps understand the inner workings\n3. **Analogies** - Thinking of layers as filters that extract increasingly complex features\n\nWhat other techniques have helped you all?",
    author: {
      id: "student005",
      name: "Emily Davis",
      avatar: "/avatar-5.jpg",
      role: "Student",
      department: "Computer Science"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    upvotes: 42,
    downvotes: 3,
    comments: 15,
    tags: ["machine-learning", "study-techniques", "neural-networks"],
    isBookmarked: false,
    course: {
      id: "course002",
      code: "ML404",
      title: "Machine Learning & Neural Networks"
    }
  },
  {
    id: "post002",
    title: "Study Group for Physics Midterm - This Saturday",
    content: "Hey everyone! I'm organizing a study group for the upcoming Physics midterm. We'll be meeting in the library's group study room #3 this Saturday at 2 PM.\n\nWe'll cover quantum mechanics problems and work through some practice exams. I've created some review materials that we can go through together.\n\nPlease comment below if you're interested in joining!",
    author: {
      id: "student010",
      name: "James Wilson",
      avatar: "/avatar-8.jpg",
      role: "Student",
      department: "Physics"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    upvotes: 18,
    downvotes: 0,
    comments: 7,
    tags: ["physics", "study-group", "midterm-prep"],
    isBookmarked: true,
    event: {
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      location: "Library, Study Room 3"
    },
    course: {
      id: "course004",
      code: "PHYS202",
      title: "Modern Physics"
    }
  },
  {
    id: "post003",
    title: "Looking for Technical Writing Partner for ENG210 Project",
    content: "I'm looking for a partner for the technical documentation project in ENG210. The project involves creating comprehensive documentation for an open-source software tool.\n\nI'm thinking of focusing on either a data visualization library or a machine learning framework. If you're interested in collaborating, please reach out! Ideally, you'd have some technical background and an interest in clear technical communication.",
    author: {
      id: "student003",
      name: "Maria Rodriguez",
      avatar: "/avatar-3.jpg",
      role: "Student",
      department: "Computer Science"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    upvotes: 5,
    downvotes: 0,
    comments: 3,
    tags: ["technical-writing", "project-partner", "documentation"],
    isBookmarked: false,
    course: {
      id: "course003",
      code: "ENG210",
      title: "Technical Writing for STEM"
    }
  },
  {
    id: "post004",
    title: "Great Resource for Algorithm Visualization",
    content: "I just found this amazing website that visualizes various algorithms step-by-step. It's been incredibly helpful for understanding sorting algorithms, graph traversals, and data structures.\n\nCheck it out: https://visualgo.net\n\nYou can control the speed of execution and see exactly what's happening at each step. Thought I'd share since we're covering these topics in CS101 right now.",
    author: {
      id: "student001",
      name: "Alex Johnson",
      avatar: "/avatar-2.jpg",
      role: "Student",
      department: "Computer Science"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    upvotes: 29,
    downvotes: 1,
    comments: 8,
    tags: ["algorithms", "resources", "visualization"],
    isBookmarked: true,
    course: {
      id: "course001",
      code: "CS101",
      title: "Introduction to Computer Science"
    }
  },
  {
    id: "post005",
    title: "Internship Opportunity at Tech Innovations Inc",
    content: "My previous employer, Tech Innovations Inc, is looking for summer interns in software development, data science, and UX design. This is a paid internship with great mentorship opportunities.\n\nThey work on some cutting-edge projects in AI and cloud computing. I had a fantastic experience there last summer and learned a ton.\n\nApplication deadline is March 15th. Here's the link to apply: https://techinnovations.example/careers/internships\n\nFeel free to message me if you have any questions about the company or application process!",
    author: {
      id: "student015",
      name: "Daniel Park",
      avatar: "/avatar-7.jpg",
      role: "Student",
      department: "Computer Science"
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    upvotes: 35,
    downvotes: 0,
    comments: 12,
    tags: ["internship", "job-opportunity", "career"],
    isBookmarked: false
  }
];

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: "event001",
    title: "AI Research Symposium",
    description: "Faculty and graduate students presenting latest research in artificial intelligence and machine learning",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    location: "Science Building, Auditorium A",
    organizer: {
      id: "prof002",
      name: "Dr. Michael Foster",
      department: "Computer Science"
    }
  },
  {
    id: "event002",
    title: "Physics Study Group",
    description: "Group study session for Modern Physics midterm preparation",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    location: "Library, Study Room 3",
    organizer: {
      id: "student010",
      name: "James Wilson",
      department: "Physics"
    }
  },
  {
    id: "event003",
    title: "Technical Writing Workshop",
    description: "Learn effective documentation techniques for technical subjects",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    location: "Liberal Arts Building, Room 142",
    organizer: {
      id: "prof003",
      name: "Prof. Elizabeth Warren",
      department: "English"
    }
  }
];

// Tags for filtering
const availableTags = [
  "machine-learning",
  "algorithms",
  "study-group",
  "resources",
  "internship",
  "project-partner",
  "neural-networks",
  "study-techniques",
  "technical-writing",
  "documentation",
  "midterm-prep",
  "job-opportunity",
  "visualization",
  "physics",
  "career"
];

// Courses for filtering
const courses = [
  { id: "course001", code: "CS101", title: "Introduction to Computer Science" },
  { id: "course002", code: "ML404", title: "Machine Learning & Neural Networks" },
  { id: "course003", code: "ENG210", title: "Technical Writing for STEM" },
  { id: "course004", code: "PHYS202", title: "Modern Physics" }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down' | null>>({});
  const [userBookmarks, setUserBookmarks] = useState<Record<string, boolean>>({
    post002: true,
    post004: true
  });

  // Function to handle upvote/downvote
  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setUserVotes(prev => {
      // If already voted the same way, remove the vote
      if (prev[postId] === voteType) {
        const newVotes = { ...prev };
        delete newVotes[postId];
        return newVotes;
      }
      // Otherwise set the new vote
      return { ...prev, [postId]: voteType };
    });
  };

  // Function to toggle bookmark
  const toggleBookmark = (postId: string) => {
    setUserBookmarks(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Format date relative to now
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Format event date
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Filter posts based on active tab, search, tags, and course
  const filteredPosts = postsData.filter(post => {
    // Filter by tab
    if (activeTab === "bookmarked" && !userBookmarks[post.id]) {
      return false;
    }
    
    // Filter by search
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !post.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tags
    if (selectedTags.length > 0 && !post.tags.some(tag => selectedTags.includes(tag))) {
      return false;
    }
    
    // Filter by course
    if (selectedCourse && (!post.course || post.course.id !== selectedCourse)) {
      return false;
    }
    
    return true;
  });
  
  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "most_upvoted":
        return b.upvotes - a.upvotes;
      case "most_commented":
        return b.comments - a.comments;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow students and share resources
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog open={isCreatePostDialogOpen} onOpenChange={setIsCreatePostDialogOpen}>
            <DialogTrigger asChild>
              <Button className="px-4">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogDescription>
                  Share your question, resource, or announcement with the community.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="post-title" className="text-sm font-medium">Title</label>
                  <Input id="post-title" placeholder="Write a descriptive title" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="post-content" className="text-sm font-medium">Content</label>
                  <Textarea 
                    id="post-content" 
                    placeholder="Share your thoughts, questions, or resources..." 
                    className="min-h-[150px]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="post-course" className="text-sm font-medium">Related Course (Optional)</label>
                    <Select>
                      <SelectTrigger id="post-course">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map(course => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.code}: {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="post-tags" className="text-sm font-medium">Tags (Optional)</label>
                    <Select>
                      <SelectTrigger id="post-tags">
                        <SelectValue placeholder="Add Tags" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTags.map(tag => (
                          <SelectItem key={tag} value={tag}>
                            {tag.replace(/-/g, ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm">
                    <ImageIcon className="h-4 w-4 mr-1" />
                    Add Image
                  </Button>
                  <Button variant="outline" size="sm">
                    <LinkIcon className="h-4 w-4 mr-1" />
                    Add Link
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Add Event
                  </Button>
                  <Button variant="outline" size="sm">
                    <AtSign className="h-4 w-4 mr-1" />
                    Mention
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatePostDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <Tabs 
              defaultValue="all" 
              className="w-full sm:w-auto"
              onValueChange={value => setActiveTab(value)}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="sm:w-64"
              />
              
              <Select 
                value={sortBy} 
                onValueChange={setSortBy}
              >
                <SelectTrigger className="sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most_upvoted">Most Upvoted</SelectItem>
                  <SelectItem value="most_commented">Most Commented</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {sortedPosts.length === 0 ? (
            <div className="text-center py-12 border rounded-md">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No posts found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedPosts.map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="bg-muted/30 p-3 flex flex-col items-center gap-3">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-8 w-8 rounded-full ${userVotes[post.id] === 'up' ? 'text-green-600 bg-green-100 dark:bg-green-950/30' : ''}`}
                            onClick={() => handleVote(post.id, 'up')}
                          >
                            <ArrowUp className="h-5 w-5" />
                          </Button>
                          <span className="text-sm font-medium">
                            {post.upvotes - post.downvotes + 
                             (userVotes[post.id] === 'up' ? 1 : 0) - 
                             (userVotes[post.id] === 'down' ? 1 : 0)}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-8 w-8 rounded-full ${userVotes[post.id] === 'down' ? 'text-red-600 bg-red-100 dark:bg-red-950/30' : ''}`}
                            onClick={() => handleVote(post.id, 'down')}
                          >
                            <ArrowDown className="h-5 w-5" />
                          </Button>
                        </div>
                        
                        <div className="py-4 px-5 flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 className="text-lg font-semibold mb-1">
                                {post.title}
                              </h3>
                              
                              <div className="flex flex-wrap gap-1.5 mb-3">
                                {post.course && (
                                  <Badge variant="outline" className="rounded-md flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    {post.course.code}
                                  </Badge>
                                )}
                                
                                {post.tags.slice(0, 3).map(tag => (
                                  <Badge key={tag} variant="secondary" className="rounded-md">
                                    {tag.replace(/-/g, ' ')}
                                  </Badge>
                                ))}
                                
                                {post.tags.length > 3 && (
                                  <Badge variant="secondary" className="rounded-md">
                                    +{post.tags.length - 3}
                                  </Badge>
                                )}
                                
                                {post.event && (
                                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900 rounded-md flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Event
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex gap-1.5">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={`h-8 w-8 ${userBookmarks[post.id] ? 'text-yellow-600' : ''}`}
                                onClick={() => toggleBookmark(post.id)}
                              >
                                <Bookmark className="h-4 w-4" fill={userBookmarks[post.id] ? "currentColor" : "none"} />
                              </Button>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    Share Post
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    Report
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    Hide Posts from this User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <div className="text-sm text-muted-foreground mb-3 line-clamp-3 whitespace-pre-line">
                            {post.content}
                          </div>
                          
                          {post.event && (
                            <div className="mb-4 border rounded-md p-3 bg-muted/10 flex items-center gap-3">
                              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 h-10 w-10 rounded-md flex items-center justify-center">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">Event: {formatEventDate(post.event.date)}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> 
                                  {post.event.location}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="text-sm">
                                <span className="font-medium">{post.author.name}</span>
                                <span className="text-muted-foreground"> · {formatRelativeTime(post.createdAt)}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.comments}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        <div className="w-full lg:w-1/4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h3 className="text-sm font-medium mb-2">Courses</h3>
                <Select 
                  value={selectedCourse} 
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Courses</SelectItem>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code}: {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {availableTags.slice(0, 10).map(tag => (
                    <Badge 
                      key={tag} 
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer rounded-md"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag.replace(/-/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {selectedTags.length > 0 && (
                <div className="flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedTags([])}
                  >
                    Clear Tags
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={event.id}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">{event.title}</h3>
                    <p className="text-muted-foreground text-xs line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatEventDate(event.date)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        By {event.organizer.name}
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="outline" size="sm" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View All Events
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Be respectful and considerate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Share relevant and helpful content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Avoid sharing personal or sensitive information</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Report inappropriate content</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-green-600" />
                  <span>Follow academic integrity guidelines</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 