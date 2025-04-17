"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  BarChart, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  ExternalLink, 
  Download, 
  Upload, 
  Video, 
  MessageSquare, 
  Bell,
  Bookmark,
  PenLine
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import { Separator } from "@/components/ui/separator";

// Mock data for courses
const coursesData = [
  {
    id: "course001",
    code: "CS101",
    title: "Introduction to Computer Science",
    description: "Fundamental concepts of programming and computer science. Learn about algorithms, data structures, and basic programming in Python.",
    instructor: {
      id: "prof001",
      name: "Dr. Sarah Chen",
      avatar: "/avatar-1.jpg",
      department: "Computer Science"
    },
    schedule: [
      { day: "Monday", startTime: "10:00 AM", endTime: "11:30 AM", location: "Science Building, Room 101" },
      { day: "Wednesday", startTime: "10:00 AM", endTime: "11:30 AM", location: "Science Building, Room 101" }
    ],
    enrollmentStatus: "enrolled", // enrolled, completed, dropped, waitlisted
    progress: 35,
    credits: 3,
    term: "Fall 2023",
    startDate: "2023-09-05",
    endDate: "2023-12-15",
    color: "#4f46e5", // indigo-600
    nextAssignment: {
      id: "assign001",
      title: "Python Basics Quiz",
      dueDate: "2023-10-15T23:59:00Z",
      type: "quiz"
    },
    upcomingLecture: {
      id: "lect001",
      title: "Variables and Data Types",
      date: "2023-10-10T10:00:00Z",
      location: "Science Building, Room 101"
    }
  },
  {
    id: "course002",
    code: "ML404",
    title: "Machine Learning & Neural Networks",
    description: "Advanced course covering machine learning algorithms, neural network architectures, and practical applications in data science.",
    instructor: {
      id: "prof002",
      name: "Dr. Michael Foster",
      avatar: "/avatar-4.jpg",
      department: "Computer Science"
    },
    schedule: [
      { day: "Tuesday", startTime: "2:00 PM", endTime: "3:30 PM", location: "Engineering Building, Room 305" },
      { day: "Thursday", startTime: "2:00 PM", endTime: "3:30 PM", location: "Engineering Building, Room 305" }
    ],
    enrollmentStatus: "enrolled",
    progress: 42,
    credits: 4,
    term: "Fall 2023",
    startDate: "2023-09-05",
    endDate: "2023-12-15",
    color: "#0ea5e9", // sky-500
    nextAssignment: {
      id: "assign002",
      title: "Neural Network Architectures Assignment",
      dueDate: "2023-10-20T23:59:00Z",
      type: "assignment"
    },
    upcomingLecture: {
      id: "lect002",
      title: "Convolutional Neural Networks",
      date: "2023-10-12T14:00:00Z",
      location: "Engineering Building, Room 305"
    }
  },
  {
    id: "course003",
    code: "ENG210",
    title: "Technical Writing for STEM",
    description: "Develop professional writing skills for technical and scientific contexts. Focus on clarity, precision, and effective communication.",
    instructor: {
      id: "prof003",
      name: "Dr. Lisa Johnson",
      avatar: "/avatar-7.jpg",
      department: "English"
    },
    schedule: [
      { day: "Friday", startTime: "1:00 PM", endTime: "3:00 PM", location: "Humanities Building, Room 210" }
    ],
    enrollmentStatus: "enrolled",
    progress: 65,
    credits: 2,
    term: "Fall 2023",
    startDate: "2023-09-05",
    endDate: "2023-12-15",
    color: "#f97316", // orange-500
    nextAssignment: {
      id: "assign003",
      title: "Research Paper First Draft",
      dueDate: "2023-10-18T23:59:00Z",
      type: "paper"
    },
    upcomingLecture: {
      id: "lect003",
      title: "Technical Documentation Standards",
      date: "2023-10-13T13:00:00Z",
      location: "Humanities Building, Room 210"
    }
  },
  {
    id: "course004",
    code: "PHYS202",
    title: "Modern Physics",
    description: "Introduction to quantum mechanics, relativity, and nuclear physics. Explore the fundamental laws that govern the universe at both cosmic and subatomic scales.",
    instructor: {
      id: "prof004",
      name: "Dr. Robert Thompson",
      avatar: "/avatar-6.jpg",
      department: "Physics"
    },
    schedule: [
      { day: "Monday", startTime: "3:00 PM", endTime: "4:30 PM", location: "Science Building, Room 205" },
      { day: "Wednesday", startTime: "3:00 PM", endTime: "4:30 PM", location: "Science Building, Room 205" },
      { day: "Thursday", startTime: "3:00 PM", endTime: "4:50 PM", location: "Physics Lab, Room 22" }
    ],
    enrollmentStatus: "enrolled",
    progress: 28,
    credits: 4,
    term: "Fall 2023",
    startDate: "2023-09-05",
    endDate: "2023-12-15",
    color: "#ef4444", // red-500
    nextAssignment: {
      id: "assign004",
      title: "Quantum Mechanics Problem Set",
      dueDate: "2023-10-17T23:59:00Z",
      type: "problem-set"
    },
    upcomingLecture: {
      id: "lect004",
      title: "Wave-Particle Duality",
      date: "2023-10-11T15:00:00Z",
      location: "Science Building, Room 205"
    }
  },
  {
    id: "course005",
    code: "MATH301",
    title: "Linear Algebra",
    description: "Study of vector spaces, linear transformations, matrices, and systems of linear equations. Applications in computer graphics, data analysis, and physics.",
    instructor: {
      id: "prof005",
      name: "Dr. Emily Wilson",
      avatar: "/avatar-8.jpg",
      department: "Mathematics"
    },
    schedule: [
      { day: "Tuesday", startTime: "11:00 AM", endTime: "12:30 PM", location: "Mathematics Building, Room 103" },
      { day: "Thursday", startTime: "11:00 AM", endTime: "12:30 PM", location: "Mathematics Building, Room 103" }
    ],
    enrollmentStatus: "completed",
    progress: 100,
    grade: "A",
    credits: 3,
    term: "Spring 2023",
    startDate: "2023-01-17",
    endDate: "2023-05-12",
    color: "#10b981", // emerald-500
  }
];

// Assignment types
const assignmentTypes = [
  { id: "assignment", name: "Assignment", icon: <FileText className="h-4 w-4" /> },
  { id: "quiz", name: "Quiz", icon: <CheckCircle className="h-4 w-4" /> },
  { id: "exam", name: "Exam", icon: <AlertCircle className="h-4 w-4" /> },
  { id: "paper", name: "Paper", icon: <PenLine className="h-4 w-4" /> },
  { id: "problem-set", name: "Problem Set", icon: <FileText className="h-4 w-4" /> },
  { id: "project", name: "Project", icon: <Bookmark className="h-4 w-4" /> }
];

// Course categories
const courseCategories = [
  { id: "all", name: "All Courses" },
  { id: "enrolled", name: "Currently Enrolled" },
  { id: "completed", name: "Completed" },
  { id: "saved", name: "Saved" }
];

// Departments
const departments = [
  { id: "cs", name: "Computer Science" },
  { id: "math", name: "Mathematics" },
  { id: "phys", name: "Physics" },
  { id: "eng", name: "English" },
  { id: "chem", name: "Chemistry" },
  { id: "bio", name: "Biology" }
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("enrolled");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Filter courses based on active category, search query, and selected departments
  const filteredCourses = coursesData.filter(course => {
    // Filter by category
    if (activeCategory === "enrolled" && course.enrollmentStatus !== "enrolled") return false;
    if (activeCategory === "completed" && course.enrollmentStatus !== "completed") return false;
    
    // Filter by search query
    if (searchQuery && !course.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !course.code.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by department
    if (selectedDepartments.length > 0 && 
        !selectedDepartments.includes(course.instructor.department.toLowerCase().replace(/\s+/g, ''))) {
      return false;
    }
    
    return true;
  });
  
  // Get the selected course data
  const getSelectedCourse = () => {
    return coursesData.find(course => course.id === selectedCourse);
  };
  
  // Toggle department selection
  const toggleDepartment = (deptId: string) => {
    if (selectedDepartments.includes(deptId)) {
      setSelectedDepartments(selectedDepartments.filter(id => id !== deptId));
    } else {
      setSelectedDepartments([...selectedDepartments, deptId]);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // Get assignment type icon
  const getAssignmentTypeIcon = (type: string) => {
    const assignmentType = assignmentTypes.find(t => t.id === type);
    return assignmentType ? assignmentType.icon : <FileText className="h-4 w-4" />;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Courses</h1>
          <p className="text-muted-foreground">
            Manage your academic courses and assignments
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-8 w-[200px] md:w-[260px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {departments.map(dept => (
                <DropdownMenuItem 
                  key={dept.id}
                  onClick={() => toggleDepartment(dept.id)}
                  className="flex items-center gap-2"
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                    {selectedDepartments.includes(dept.id) && <CheckCircle className="h-3 w-3" />}
                  </div>
                  <span>{dept.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Search for courses to add to your schedule.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="relative mb-4">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search course catalog..." className="pl-8" />
                </div>
                
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  <div className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">CS202: Data Structures & Algorithms</h4>
                        <p className="text-sm text-muted-foreground">Computer Science Department</p>
                      </div>
                      <Badge>4 Credits</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>32 enrolled / 40 capacity</span>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">CS305: Database Systems</h4>
                        <p className="text-sm text-muted-foreground">Computer Science Department</p>
                      </div>
                      <Badge>3 Credits</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>28 enrolled / 35 capacity</span>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">MATH202: Calculus II</h4>
                        <p className="text-sm text-muted-foreground">Mathematics Department</p>
                      </div>
                      <Badge>4 Credits</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>45 enrolled / 50 capacity</span>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Add Selected Courses</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pt-1">
              {courseCategories.map(category => (
                <button
                  key={category.id}
                  className={`w-full flex items-center gap-2 px-2 py-2 text-sm rounded-md transition-colors ${
                    activeCategory === category.id 
                      ? 'bg-muted/40 font-medium' 
                      : 'hover:bg-muted/20'
                  }`}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setSelectedCourse(null);
                  }}
                >
                  <span>{category.name}</span>
                  <Badge variant="outline" className="ml-auto">
                    {category.id === "all" 
                      ? coursesData.length 
                      : category.id === "enrolled" 
                        ? coursesData.filter(c => c.enrollmentStatus === "enrolled").length
                        : category.id === "completed"
                          ? coursesData.filter(c => c.enrollmentStatus === "completed").length
                          : 0
                    }
                  </Badge>
                </button>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-1">
              {coursesData
                .filter(course => course.enrollmentStatus === "enrolled")
                .slice(0, 3)
                .map(course => (
                  <div key={course.id} className="space-y-1">
                    {course.nextAssignment && (
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          {getAssignmentTypeIcon(course.nextAssignment.type)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{course.nextAssignment.title}</p>
                          <div className="flex items-center text-muted-foreground text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Due {formatDate(course.nextAssignment.dueDate)}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className="text-xs mt-1"
                            style={{ borderColor: course.color, color: course.color }}
                          >
                            {course.code}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              
              {coursesData.filter(course => course.enrollmentStatus === "enrolled").length === 0 && (
                <div className="text-center py-4">
                  <Calendar className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground mt-2 text-sm">No upcoming assignments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          {selectedCourse ? (
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mb-2"
                    onClick={() => setSelectedCourse(null)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Courses
                  </Button>
                  <CardTitle className="text-2xl">{getSelectedCourse()?.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge>{getSelectedCourse()?.code}</Badge>
                    <span>•</span>
                    <span>{getSelectedCourse()?.credits} Credits</span>
                    <span>•</span>
                    <span>{getSelectedCourse()?.term}</span>
                  </CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        <span>Add to Favorites</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notification Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download Syllabus</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        <span>Drop Course</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <div className="px-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="grades">Grades</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="overview" className="p-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Course Description</h3>
                        <p className="text-muted-foreground">{getSelectedCourse()?.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Schedule</h3>
                        <div className="space-y-2">
                          {getSelectedCourse()?.schedule.map((session, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 rounded-md border">
                              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="font-medium">{session.day}</p>
                                <p className="text-sm text-muted-foreground">{session.startTime} - {session.endTime}</p>
                                <p className="text-sm text-muted-foreground">{session.location}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Upcoming</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {getSelectedCourse()?.upcomingLecture && (
                            <div className="p-4 rounded-md border">
                              <div className="flex items-center gap-2 mb-2">
                                <Video className="h-5 w-5 text-muted-foreground" />
                                <h4 className="font-medium">Next Lecture</h4>
                              </div>
                              <p className="text-sm">{getSelectedCourse()?.upcomingLecture.title}</p>
                              <div className="mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(getSelectedCourse()?.upcomingLecture.date || "")}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{formatTime(getSelectedCourse()?.upcomingLecture.date || "")}</span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" className="mt-3 w-full">
                                <Link href="/virtual-classroom" className="flex items-center gap-1">
                                  <Video className="h-4 w-4" />
                                  Join Virtual Classroom
                                </Link>
                              </Button>
                            </div>
                          )}
                          
                          {getSelectedCourse()?.nextAssignment && (
                            <div className="p-4 rounded-md border">
                              <div className="flex items-center gap-2 mb-2">
                                {getAssignmentTypeIcon(getSelectedCourse()?.nextAssignment.type || "")}
                                <h4 className="font-medium">Next Assignment</h4>
                              </div>
                              <p className="text-sm">{getSelectedCourse()?.nextAssignment.title}</p>
                              <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Due {formatDate(getSelectedCourse()?.nextAssignment.dueDate || "")}</span>
                              </div>
                              <Button variant="outline" size="sm" className="mt-3 w-full">
                                View Assignment
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Course Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Completion</span>
                              <span className="font-medium">{getSelectedCourse()?.progress}%</span>
                            </div>
                            <Progress value={getSelectedCourse()?.progress} className="h-2" />
                          </div>
                          
                          <div className="mt-4 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Start Date</span>
                              <span>{formatDate(getSelectedCourse()?.startDate || "")}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>End Date</span>
                              <span>{formatDate(getSelectedCourse()?.endDate || "")}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Instructor</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{getSelectedCourse()?.instructor.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{getSelectedCourse()?.instructor.name}</p>
                              <p className="text-sm text-muted-foreground">{getSelectedCourse()?.instructor.department}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Users className="h-4 w-4 mr-2" />
                              Office Hours
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <FileText className="h-4 w-4 mr-2" />
                              Syllabus
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Course Materials
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Discussion Forum
                            </Button>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <BarChart className="h-4 w-4 mr-2" />
                              Grade Center
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="assignments" className="p-6 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Assignments & Assessments</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Submit Assignment
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-4 rounded-md border">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            {getAssignmentTypeIcon("assignment")}
                            <div>
                              <h4 className="font-medium">Neural Network Architectures Assignment</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Implement and compare different neural network architectures for image classification.
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">20 points</Badge>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Due Oct 20, 2023</span>
                            </div>
                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                              Pending
                            </Badge>
                          </div>
                          
                          <Button size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Submit
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-md border">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            {getAssignmentTypeIcon("quiz")}
                            <div>
                              <h4 className="font-medium">Midterm Review Quiz</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Practice quiz covering all topics from the first half of the semester.
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">10 points</Badge>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Due Oct 15, 2023</span>
                            </div>
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Completed
                            </Badge>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Results
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-md border">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            {getAssignmentTypeIcon("exam")}
                            <div>
                              <h4 className="font-medium">Midterm Examination</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Comprehensive examination covering all material from weeks 1-7.
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">100 points</Badge>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Oct 30, 2023</span>
                            </div>
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                              Upcoming
                            </Badge>
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Study Guide
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="materials" className="p-6 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Course Materials</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Week 7: Neural Network Architectures</h4>
                        <div className="space-y-2">
                          <div className="p-3 rounded-md border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Lecture Slides: CNN Architectures</p>
                                <p className="text-xs text-muted-foreground">PDF • 2.4 MB • Uploaded Oct 10, 2023</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                          
                          <div className="p-3 rounded-md border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Video className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Lecture Recording: CNN Architectures</p>
                                <p className="text-xs text-muted-foreground">MP4 • 1.2 GB • Recorded Oct 10, 2023</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                          
                          <div className="p-3 rounded-md border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Supplementary Reading: CNN Paper Collection</p>
                                <p className="text-xs text-muted-foreground">PDF • 5.7 MB • Uploaded Oct 11, 2023</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Week 6: Backpropagation & Optimization</h4>
                        <div className="space-y-2">
                          <div className="p-3 rounded-md border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Lecture Slides: Optimization Techniques</p>
                                <p className="text-xs text-muted-foreground">PDF • 1.8 MB • Uploaded Oct 3, 2023</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                          
                          <div className="p-3 rounded-md border flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Video className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Lecture Recording: Optimization Techniques</p>
                                <p className="text-xs text-muted-foreground">MP4 • 980 MB • Recorded Oct 3, 2023</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="grades" className="p-6 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Grade Summary</h3>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Grades
                      </Button>
                    </div>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Current Grade</p>
                            <div className="text-3xl font-bold">92.5%</div>
                            <Badge className="bg-green-500/10 text-green-500">A</Badge>
                          </div>
                          
                          <div className="w-full md:w-2/3">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Assignments (40%)</span>
                                  <span className="font-medium">95%</span>
                                </div>
                                <Progress value={95} className="h-2" />
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Quizzes (20%)</span>
                                  <span className="font-medium">88%</span>
                                </div>
                                <Progress value={88} className="h-2" />
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Midterm (20%)</span>
                                  <span className="font-medium">Upcoming</span>
                                </div>
                                <Progress value={0} className="h-2" />
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Final Project (20%)</span>
                                  <span className="font-medium">Upcoming</span>
                                </div>
                                <Progress value={0} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Grade Details</h4>
                      
                      <div className="rounded-md border">
                        <div className="p-3 border-b flex items-center justify-between font-medium">
                          <div className="flex items-center gap-2">
                            <span>Assignment</span>
                          </div>
                          <div className="flex items-center gap-8">
                            <span>Due Date</span>
                            <span>Score</span>
                            <span>Grade</span>
                          </div>
                        </div>
                        
                        <div className="divide-y">
                          <div className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Python Basics Quiz</span>
                            </div>
                            <div className="flex items-center gap-8">
                              <span className="text-sm text-muted-foreground w-24">Sep 15, 2023</span>
                              <span className="text-sm w-16">9/10</span>
                              <Badge className="bg-green-500/10 text-green-500">90%</Badge>
                            </div>
                          </div>
                          
                          <div className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Data Preprocessing Assignment</span>
                            </div>
                            <div className="flex items-center gap-8">
                              <span className="text-sm text-muted-foreground w-24">Sep 22, 2023</span>
                              <span className="text-sm w-16">19/20</span>
                              <Badge className="bg-green-500/10 text-green-500">95%</Badge>
                            </div>
                          </div>
                          
                          <div className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Midterm Review Quiz</span>
                            </div>
                            <div className="flex items-center gap-8">
                              <span className="text-sm text-muted-foreground w-24">Oct 15, 2023</span>
                              <span className="text-sm w-16">8.5/10</span>
                              <Badge className="bg-green-500/10 text-green-500">85%</Badge>
                            </div>
                          </div>
                          
                          <div className="p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>Neural Network Architectures Assignment</span>
                            </div>
                            <div className="flex items-center gap-8">
                              <span className="text-sm text-muted-foreground w-24">Oct 20, 2023</span>
                              <span className="text-sm w-16">-/20</span>
                              <Badge variant="outline">Pending</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedCourse(course.id)}
                  >
                    <div className="h-2" style={{ backgroundColor: course.color }}></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription className="mt-1">{course.code}</CardDescription>
                        </div>
                        <Badge variant={course.enrollmentStatus === "completed" ? "outline" : "default"}>
                          {course.enrollmentStatus === "enrolled" ? "Current" : "Completed"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Calendar className="h-4 w-4" />
                        <span>{course.term}</span>
                        <span>•</span>
                        <span>{course.credits} Credits</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{course.instructor.name}</p>
                            <p className="text-xs text-muted-foreground">{course.instructor.department}</p>
                          </div>
                        </div>
                        
                        {course.enrollmentStatus === "enrolled" && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-1.5" />
                          </div>
                        )}
                        
                        {course.enrollmentStatus === "completed" && course.grade && (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-500/10 text-green-500">
                              Final Grade: {course.grade}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      {course.enrollmentStatus === "enrolled" && course.nextAssignment && (
                        <div className="w-full">
                          <p className="text-xs text-muted-foreground mb-1">Next Assignment</p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm truncate">{course.nextAssignment.title}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(course.nextAssignment.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {course.enrollmentStatus === "completed" && (
                        <Button variant="outline" size="sm" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          View Course Records
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
              
              {filteredCourses.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria.</p>
                  <Button>Browse Course Catalog</Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
