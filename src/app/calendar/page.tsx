"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  Users, 
  Video, 
  BookOpen, 
  FileText, 
  CheckCircle,
  MoreHorizontal,
  Filter,
  Search,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for calendar events
const calendarEvents = [
  {
    id: "evt001",
    title: "Machine Learning Lecture",
    description: "Introduction to Neural Networks",
    startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
    location: "Science Building, Room 305",
    type: "class", // class, assignment, exam, personal, institution, holiday
    course: {
      id: "course002",
      code: "ML404",
      title: "Machine Learning & Neural Networks"
    },
    instructor: {
      id: "prof002",
      name: "Dr. Michael Foster",
      avatar: "/avatar-4.jpg"
    },
    isRecurring: true,
    recurrencePattern: "weekly",
    color: "#4f46e5" // indigo-600
  },
  {
    id: "evt002",
    title: "Algorithm Analysis Project",
    description: "Complete and submit the algorithm analysis project",
    startTime: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    type: "assignment",
    course: {
      id: "course001",
      code: "CS101",
      title: "Introduction to Computer Science"
    },
    color: "#ef4444" // red-500
  },
  {
    id: "evt003",
    title: "Physics Lab Session",
    description: "Quantum mechanics experimental lab",
    startTime: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(16, 50, 0, 0)).toISOString(),
    location: "Physics Lab, Room 22",
    type: "class",
    course: {
      id: "course004",
      code: "PHYS202",
      title: "Modern Physics"
    },
    instructor: {
      id: "prof004",
      name: "Dr. Robert Thompson",
      avatar: "/avatar-6.jpg"
    },
    isRecurring: true,
    recurrencePattern: "weekly",
    color: "#0ea5e9" // sky-500
  },
  {
    id: "evt004",
    title: "Study Group Session",
    description: "Machine Learning midterm preparation",
    startTime: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(14, 0, 0, 0).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 2)).setHours(16, 0, 0, 0).toISOString(),
    location: "Library, Study Room 3",
    type: "personal",
    participants: [
      {
        id: "student001",
        name: "Alex Johnson",
        avatar: "/avatar-2.jpg"
      },
      {
        id: "student003",
        name: "Maria Rodriguez",
        avatar: "/avatar-3.jpg"
      },
      {
        id: "student005",
        name: "Emily Davis",
        avatar: "/avatar-5.jpg"
      }
    ],
    color: "#8b5cf6" // violet-500
  },
  {
    id: "evt005",
    title: "Neural Networks Practical Exam",
    description: "Hands-on practical examination on neural network implementations",
    startTime: new Date(new Date().setDate(new Date().getDate() + 21)).setHours(13, 0, 0, 0).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 21)).setHours(15, 0, 0, 0).toISOString(),
    location: "Computing Center, Lab 3",
    type: "exam",
    course: {
      id: "course002",
      code: "ML404",
      title: "Machine Learning & Neural Networks"
    },
    color: "#f97316" // orange-500
  },
  {
    id: "evt006",
    title: "Virtual Study Session",
    description: "Optional study session for Machine Learning assignment",
    startTime: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(16, 0, 0, 0).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(17, 0, 0, 0).toISOString(),
    type: "class",
    isVirtual: true,
    meetingUrl: "https://university.zoom.us/j/123456789",
    course: {
      id: "course002",
      code: "ML404",
      title: "Machine Learning & Neural Networks"
    },
    instructor: {
      id: "prof002",
      name: "Dr. Michael Foster",
      avatar: "/avatar-4.jpg"
    },
    color: "#4f46e5" // indigo-600
  },
  {
    id: "evt007",
    title: "Research Paper First Draft Deadline",
    description: "Submit the first draft of your technical writing research paper",
    startTime: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    type: "assignment",
    course: {
      id: "course003",
      code: "ENG210",
      title: "Technical Writing for STEM"
    },
    color: "#ef4444" // red-500
  },
  {
    id: "evt008",
    title: "University Career Fair",
    description: "Annual career fair with tech industry representatives",
    startTime: new Date(new Date().setDate(new Date().getDate() + 14)).setHours(10, 0, 0, 0).toISOString(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 14)).setHours(16, 0, 0, 0).toISOString(),
    location: "Student Union Building, Main Hall",
    type: "institution",
    color: "#10b981" // emerald-500
  }
];

// Event categories
const eventCategories = [
  { id: "class", name: "Classes", color: "#4f46e5", icon: <BookOpen className="h-4 w-4" />, checked: true },
  { id: "assignment", name: "Assignments", color: "#ef4444", icon: <FileText className="h-4 w-4" />, checked: true },
  { id: "exam", name: "Exams", color: "#f97316", icon: <CheckCircle className="h-4 w-4" />, checked: true },
  { id: "personal", name: "Personal", color: "#8b5cf6", icon: <Users className="h-4 w-4" />, checked: true },
  { id: "institution", name: "Institution", color: "#10b981", icon: <CalendarIcon className="h-4 w-4" />, checked: true }
];

// Courses for filtering
const courses = [
  { id: "course001", code: "CS101", title: "Introduction to Computer Science" },
  { id: "course002", code: "ML404", title: "Machine Learning & Neural Networks" },
  { id: "course003", code: "ENG210", title: "Technical Writing for STEM" },
  { id: "course004", code: "PHYS202", title: "Modern Physics" }
];

// Days of the week
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Function to get the days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Function to get the first day of the month (0 = Sunday, 1 = Monday, etc.)
const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

export default function CalendarPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [activeView, setActiveView] = useState<"month" | "week" | "day" | "agenda">("month");
  const [selectedCategories, setSelectedCategories] = useState(eventCategories.map(cat => cat.id));
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);

  // Helper functions for date manipulation
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Navigate to today
  const goToToday = () => {
    setCurrentDate(new Date());
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Filter events based on search, categories, and courses
  const filteredEvents = calendarEvents.filter(event => {
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
                         event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by event category
    const matchesCategory = selectedCategories.includes(event.type);
    
    // Filter by course
    const matchesCourse = selectedCourses.length === 0 || 
                         (event.course && selectedCourses.includes(event.course.id));
    
    return matchesSearch && matchesCategory && matchesCourse;
  });

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  // Toggle course selection
  const toggleCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.getDate() === day && 
             eventDate.getMonth() === currentMonth && 
             eventDate.getFullYear() === currentYear;
    });
  };

  // Get the icon for event type
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <BookOpen className="h-4 w-4" />;
      case 'assignment':
        return <FileText className="h-4 w-4" />;
      case 'exam':
        return <CheckCircle className="h-4 w-4" />;
      case 'personal':
        return <Users className="h-4 w-4" />;
      case 'institution':
        return <CalendarIcon className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  // Render calendar cells for month view
  const renderCalendarCells = () => {
    const days = [];
    const totalCells = firstDayOfMonth + daysInMonth;
    const rows = Math.ceil(totalCells / 7);
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 md:h-32 p-1 border border-muted bg-muted/20">
          <span className="text-muted-foreground text-sm"></span>
        </div>
      );
    }
    
    // Add cells for each day in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const dayEvents = getEventsForDay(day);
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`h-24 md:h-32 p-1 border border-muted overflow-hidden ${isToday ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
        >
          <div className="flex justify-between items-center">
            <span className={`inline-block rounded-full w-6 h-6 text-center text-sm ${isToday ? 'bg-blue-600 text-white' : ''}`}>
              {day}
            </span>
            {dayEvents.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {dayEvents.length}
              </Badge>
            )}
          </div>
          <div className="mt-1 space-y-1 overflow-hidden">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <div 
                key={`event-${event.id}-${idx}`} 
                className="text-xs px-1.5 py-0.5 rounded truncate"
                style={{ backgroundColor: `${event.color}20`, color: event.color }}
              >
                {formatTime(event.startTime)} {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-muted-foreground">
                + {dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // Add empty cells for days after the end of the month
    const remainingCells = rows * 7 - (firstDayOfMonth + daysInMonth);
    for (let i = 0; i < remainingCells; i++) {
      days.push(
        <div key={`empty-end-${i}`} className="h-24 md:h-32 p-1 border border-muted bg-muted/20">
          <span className="text-muted-foreground text-sm"></span>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Calendar</h1>
          <p className="text-muted-foreground">
            View and manage your schedule
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-2">
              <span className="font-medium">
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" onClick={goToToday}>Today</Button>
          
          <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogDescription>
                  Create a new event in your calendar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="event-title" className="text-sm font-medium">Event Title</label>
                  <Input id="event-title" placeholder="Enter event title" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="event-type" className="text-sm font-medium">Event Type</label>
                    <Select defaultValue="class">
                      <SelectTrigger id="event-type">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventCategories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center">
                              {category.icon}
                              <span className="ml-2">{category.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="event-course" className="text-sm font-medium">Related Course (Optional)</label>
                    <Select>
                      <SelectTrigger id="event-course">
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
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="event-date" className="text-sm font-medium">Date</label>
                    <Input id="event-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" placeholder="Start" />
                      <Input type="time" placeholder="End" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="event-location" className="text-sm font-medium">Location (Optional)</label>
                  <Input id="event-location" placeholder="Enter location" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="event-description" className="text-sm font-medium">Description (Optional)</label>
                  <Input id="event-description" placeholder="Enter description" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddEventDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Add Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h3 className="text-sm font-medium mb-2">Event Types</h3>
                <div className="space-y-2">
                  {eventCategories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category.id}`} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label 
                        htmlFor={`category-${category.id}`}
                        className="text-sm flex items-center"
                        style={{ color: category.color }}
                      >
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Courses</h3>
                <div className="space-y-2">
                  {courses.map(course => (
                    <div key={course.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`course-${course.id}`} 
                        checked={selectedCourses.includes(course.id)}
                        onCheckedChange={() => toggleCourse(course.id)}
                      />
                      <label htmlFor={`course-${course.id}`} className="text-sm flex items-center">
                        <span className="truncate">{course.code}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Search</h3>
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredEvents
                .filter(event => new Date(event.startTime) >= new Date())
                .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="space-y-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {new Date(event.startTime).toLocaleDateString()} at {formatTime(event.startTime)}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center text-muted-foreground text-xs">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.course && (
                      <Badge 
                        variant="outline" 
                        className="text-xs mt-1"
                        style={{ borderColor: event.color, color: event.color }}
                      >
                        {event.course.code}
                      </Badge>
                    )}
                  </div>
                ))}
              
              {filteredEvents.filter(event => new Date(event.startTime) >= new Date()).length === 0 && (
                <div className="text-center py-4">
                  <CalendarIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground mt-2 text-sm">No upcoming events</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardHeader className="p-4">
              <Tabs defaultValue="month" className="w-full">
                <TabsList className="grid grid-cols-4 w-full md:w-96">
                  <TabsTrigger 
                    value="month" 
                    onClick={() => setActiveView("month")}
                  >
                    Month
                  </TabsTrigger>
                  <TabsTrigger 
                    value="week" 
                    onClick={() => setActiveView("week")}
                  >
                    Week
                  </TabsTrigger>
                  <TabsTrigger 
                    value="day" 
                    onClick={() => setActiveView("day")}
                  >
                    Day
                  </TabsTrigger>
                  <TabsTrigger 
                    value="agenda" 
                    onClick={() => setActiveView("agenda")}
                  >
                    Agenda
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-4">
              {activeView === 'month' && (
                <>
                  <div className="grid grid-cols-7 mb-2">
                    {daysOfWeek.map((day, i) => (
                      <div key={i} className="text-center text-sm font-medium p-2">
                        {day.substring(0, 3)}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7">
                    {renderCalendarCells()}
                  </div>
                </>
              )}
              
              {activeView === 'agenda' && (
                <div className="space-y-6">
                  {Object.entries(
                    filteredEvents
                      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                      .reduce((acc, event) => {
                        const eventDate = new Date(event.startTime).toDateString();
                        if (!acc[eventDate]) {
                          acc[eventDate] = [];
                        }
                        acc[eventDate].push(event);
                        return acc;
                      }, {} as Record<string, typeof calendarEvents>)
                  )
                  .map(([date, events]) => (
                    <div key={date}>
                      <h3 className="text-base font-semibold mb-3">
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </h3>
                      <div className="space-y-2">
                        {events.map(event => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Card className="overflow-hidden hover:shadow-md transition-shadow">
                              <CardContent className="p-0">
                                <div className="flex border-l-4" style={{ borderColor: event.color }}>
                                  <div className="py-3 px-4 flex-1">
                                    <div className="flex justify-between items-start gap-2">
                                      <div>
                                        <h4 className="font-medium text-base">{event.title}</h4>
                                        {event.description && (
                                          <p className="text-muted-foreground text-sm mt-1">
                                            {event.description}
                                          </p>
                                        )}
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>
                                            Edit Event
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                            Set Reminder
                                          </DropdownMenuItem>
                                          {event.course && (
                                            <DropdownMenuItem>
                                              View Course
                                            </DropdownMenuItem>
                                          )}
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="text-red-600">
                                            Delete Event
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-3 mt-3">
                                      <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                                        <span className="text-sm">
                                          {formatTime(event.startTime)}
                                          {event.endTime && ` - ${formatTime(event.endTime)}`}
                                        </span>
                                      </div>
                                      
                                      {event.location && (
                                        <div className="flex items-center">
                                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                                          <span className="text-sm">{event.location}</span>
                                        </div>
                                      )}
                                      
                                      {event.isVirtual && (
                                        <div className="flex items-center">
                                          <Video className="h-4 w-4 mr-1 text-muted-foreground" />
                                          <span className="text-sm">Virtual</span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-2 mt-3">
                                      <Badge 
                                        className="text-xs" 
                                        style={{ backgroundColor: `${event.color}30`, color: event.color }}
                                      >
                                        {getEventTypeIcon(event.type)}
                                        <span className="ml-1">
                                          {eventCategories.find(cat => cat.id === event.type)?.name || event.type}
                                        </span>
                                      </Badge>
                                      
                                      {event.course && (
                                        <Badge variant="outline" className="text-xs">
                                          {event.course.code}
                                        </Badge>
                                      )}
                                      
                                      {event.isRecurring && (
                                        <Badge variant="outline" className="text-xs">
                                          Recurring
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-semibold">No events found</h3>
                      <p className="text-muted-foreground mt-2">Try adjusting your filters or search criteria.</p>
                    </div>
                  )}
                </div>
              )}
              
              {(activeView === 'week' || activeView === 'day') && (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">View Coming Soon</h3>
                  <p className="text-muted-foreground mt-2">This view is under development.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 