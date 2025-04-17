"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  BookOpen, 
  Clock, 
  Calendar,
  Video,
  Users,
  Search,
  Filter,
  ChevronRight,
  Bookmark,
  Star,
  Plus,
  MoreHorizontal,
  CheckCircle,
  PenLine,
  FileText,
  GraduationCap,
  ArrowUpRight,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
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

// Mock data for courses
const coursesData = [
  {
    id: "course001",
    code: "CS101",
    title: "Introduction to Computer Science",
    department: "Computer Science",
    description: "A comprehensive introduction to computer science principles, algorithms, and programming fundamentals.",
    instructor: {
      id: "prof001",
      name: "Dr. Sarah Chen",
      avatar: "/avatar-1.jpg",
      department: "Computer Science"
    },
    term: "Fall 2023",
    progress: 78,
    status: "active",
    creditHours: 3,
    enrollmentDate: "2023-09-05",
    meetingTimes: [
      { day: "Monday", startTime: "10:00 AM", endTime: "11:30 AM", location: "Science Building, Room 305" },
      { day: "Wednesday", startTime: "10:00 AM", endTime: "11:30 AM", location: "Science Building, Room 305" }
    ],
    nextAssignment: {
      id: "asn001",
      title: "Algorithm Analysis Project",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      status: "pending"
    },
    upcomingExam: {
      id: "exm002",
      title: "Midterm Examination",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
      location: "Main Hall, Room 201"
    },
    tags: ["Required", "Core", "Beginner"],
    thumbnail: "/course-cs101.jpg"
  },
  {
    id: "course002",
    code: "ML404",
    title: "Machine Learning & Neural Networks",
    department: "Computer Science",
    description: "Advanced study of machine learning techniques, neural network architectures, and deep learning frameworks.",
    instructor: {
      id: "prof002",
      name: "Dr. Michael Foster",
      avatar: "/avatar-4.jpg",
      department: "Computer Science"
    },
    term: "Fall 2023",
    progress: 45,
    status: "active",
    creditHours: 4,
    enrollmentDate: "2023-09-05",
    meetingTimes: [
      { day: "Tuesday", startTime: "1:00 PM", endTime: "2:50 PM", location: "AI Lab, Tech Building" },
      { day: "Thursday", startTime: "1:00 PM", endTime: "2:50 PM", location: "AI Lab, Tech Building" }
    ],
    nextAssignment: {
      id: "asn005",
      title: "Neural Network Implementation",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
      status: "pending"
    },
    upcomingExam: {
      id: "exm006",
      title: "Neural Networks Practical Exam",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
      location: "Computing Center, Lab 3"
    },
    tags: ["Elective", "Advanced", "Practical"],
    thumbnail: "/course-ml404.jpg"
  },
  {
    id: "course003",
    code: "ENG210",
    title: "Technical Writing for STEM",
    department: "English",
    description: "Develops technical writing skills specifically for science, technology, engineering, and mathematics disciplines.",
    instructor: {
      id: "prof003",
      name: "Prof. Elizabeth Warren",
      avatar: "/avatar-5.jpg",
      department: "English"
    },
    term: "Fall 2023",
    progress: 62,
    status: "active",
    creditHours: 3,
    enrollmentDate: "2023-09-05",
    meetingTimes: [
      { day: "Monday", startTime: "2:00 PM", endTime: "3:30 PM", location: "Liberal Arts Building, Room 142" },
      { day: "Friday", startTime: "2:00 PM", endTime: "3:30 PM", location: "Liberal Arts Building, Room 142" }
    ],
    nextAssignment: {
      id: "asn007",
      title: "Research Paper - First Draft",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      status: "pending"
    },
    upcomingExam: null,
    tags: ["Required", "General Education", "Writing Intensive"],
    thumbnail: "/course-eng210.jpg"
  },
  {
    id: "course004",
    code: "PHYS202",
    title: "Modern Physics",
    department: "Physics",
    description: "Introduction to quantum mechanics, relativity, and nuclear physics with applications to modern technologies.",
    instructor: {
      id: "prof004",
      name: "Dr. Robert Thompson",
      avatar: "/avatar-6.jpg",
      department: "Physics"
    },
    term: "Fall 2023",
    progress: 35,
    status: "active",
    creditHours: 4,
    enrollmentDate: "2023-09-05",
    meetingTimes: [
      { day: "Tuesday", startTime: "9:00 AM", endTime: "10:50 AM", location: "Physics Building, Room 112" },
      { day: "Thursday", startTime: "9:00 AM", endTime: "10:50 AM", location: "Physics Building, Room 112" },
      { day: "Wednesday", startTime: "3:00 PM", endTime: "4:50 PM", location: "Physics Lab, Room 22" }
    ],
    nextAssignment: {
      id: "asn009",
      title: "Quantum Mechanics Problem Set",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString(),
      status: "pending"
    },
    upcomingExam: {
      id: "exm010",
      title: "Relativity Quiz",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
      location: "Physics Building, Room 112"
    },
    tags: ["Required", "Lab Component", "Intermediate"],
    thumbnail: "/course-phys202.jpg"
  }
];

// Departments for filtering
const departments = [
  "All Departments",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "English",
  "History",
  "Psychology"
];

// Terms for filtering
const terms = [
  "All Terms",
  "Fall 2023",
  "Summer 2023",
  "Spring 2023",
  "Fall 2022"
];

// Course status options
const courseStatuses = [
  "All Courses",
  "Active",
  "Completed",
  "Upcoming",
  "Archived"
];

export default function Courses() {
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedTerm, setSelectedTerm] = useState("All Terms");
  const [selectedStatus, setSelectedStatus] = useState("All Courses");
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  // Filter courses based on search and filters
  const filteredCourses = coursesData.filter(course => {
    // Search query filter
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Department filter
    const matchesDepartment = selectedDepartment === "All Departments" || 
                              course.department === selectedDepartment;
    
    // Term filter
    const matchesTerm = selectedTerm === "All Terms" || 
                        course.term === selectedTerm;
    
    // Status filter
    const matchesStatus = selectedStatus === "All Courses" || 
                         course.status === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesDepartment && matchesTerm && matchesStatus;
  });

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to get time remaining for assignments and exams
  const getTimeRemaining = (dateString: string) => {
    const now = new Date();
    const dueDate = new Date(dateString);
    const diffTime = Math.abs(dueDate.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  // Function to get progress color based on value
  const getProgressColor = (value: number) => {
    if (value < 30) return "bg-red-500";
    if (value < 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Courses</h1>
          <p className="text-muted-foreground">
            View and manage your enrolled courses
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" onClick={() => setActiveView(activeView === "grid" ? "list" : "grid")}>
            {activeView === "grid" ? (
              <FileText className="h-4 w-4 mr-2" />
            ) : (
              <BookOpen className="h-4 w-4 mr-2" />
            )}
            View as {activeView === "grid" ? "List" : "Grid"}
          </Button>
          <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Register for Courses
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Register for Courses</DialogTitle>
                <DialogDescription>
                  Search for available courses and register for the current or upcoming term.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="term-select" className="text-sm font-medium">Term</label>
                    <Select defaultValue="Fall 2023">
                      <SelectTrigger id="term-select">
                        <SelectValue placeholder="Select Term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                        <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                        <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="department-select" className="text-sm font-medium">Department</label>
                    <Select defaultValue="All Departments">
                      <SelectTrigger id="department-select">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="course-search" className="text-sm font-medium">Search Courses</label>
                  <Input id="course-search" placeholder="Search by course title, code, or instructor" />
                </div>
                <div className="border rounded-md p-4 h-[200px] overflow-y-auto">
                  <p className="text-sm text-center text-muted-foreground">
                    Available courses will appear here based on your search criteria.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRegisterDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Register Selected Courses</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search courses by title, code, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              prefix={<Search className="w-4 h-4 mr-2 text-muted-foreground" />}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select 
              value={selectedDepartment} 
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={selectedTerm} 
              onValueChange={setSelectedTerm}
            >
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Term" />
              </SelectTrigger>
              <SelectContent>
                {terms.map((term) => (
                  <SelectItem key={term} value={term}>{term}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={selectedStatus} 
              onValueChange={setSelectedStatus}
            >
              <SelectTrigger className="min-w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {courseStatuses.map((status) => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No courses found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <>
          {activeView === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative h-36 bg-gradient-to-r from-blue-600 to-indigo-600">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="h-16 w-16 text-white opacity-25" />
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="rounded-full bg-white/20 text-white hover:bg-white/30">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                            {course.code}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <BookOpen className="h-4 w-4 mr-2" />
                                View Course
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="h-4 w-4 mr-2" />
                                View Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Assignments
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Users className="h-4 w-4 mr-2" />
                                Classmates
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Tag className="h-3.5 w-3.5" />
                          {course.department}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {course.term}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                          <AvatarFallback>{course.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{course.instructor.name}</p>
                          <p className="text-xs text-muted-foreground">{course.instructor.department}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Course Progress</span>
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className={getProgressColor(course.progress)} />
                        </div>

                        {course.nextAssignment && (
                          <div className="border rounded-md p-3 bg-muted/30">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium flex items-center">
                                <FileText className="h-3.5 w-3.5 mr-1" />
                                Next Assignment
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                Due in {getTimeRemaining(course.nextAssignment.dueDate)}
                              </Badge>
                            </div>
                            <p className="text-sm line-clamp-1">{course.nextAssignment.title}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex justify-between">
                      <div className="flex gap-1">
                        {course.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {course.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{course.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/course/${course.id}`}>
                          Go to Course
                          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center p-4 md:p-6">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="rounded-md flex items-center justify-center h-14 w-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shrink-0">
                            <BookOpen className="h-7 w-7" />
                          </div>
                          <div className="space-y-1 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{course.code}</Badge>
                              <Badge variant="secondary" className="text-xs">
                                {course.creditHours} Credits
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-base md:text-lg truncate">{course.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{course.term}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Tag className="h-3.5 w-3.5" />
                                <span>{course.department}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 md:ml-4 flex flex-col md:flex-row md:items-center gap-3">
                          <div className="w-full md:w-40">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium">Progress</span>
                              <span className="text-xs font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className={getProgressColor(course.progress)} />
                          </div>
                          <Button variant="outline" size="sm" className="w-full md:w-auto" asChild>
                            <Link href={`/course/${course.id}`}>
                              View Course
                              <ChevronRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <BookOpen className="h-4 w-4 mr-2" />
                                View Syllabus
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="h-4 w-4 mr-2" />
                                Assignments
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <GraduationCap className="h-4 w-4 mr-2" />
                                Grades
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Bookmark className="h-4 w-4 mr-2" />
                                Save Course
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
} 