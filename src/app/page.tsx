"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Brain, 
  BookOpen, 
  Clock, 
  BrainCircuit, 
  Video, 
  Users, 
  Camera, 
  MessageSquare, 
  Sparkles,
  ChevronRight,
  Calendar,
  Trophy,
  TrendingUp,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/app-layout";

// Mock data
const courseData = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    instructor: "Dr. Sarah Chen",
    progress: 75,
    nextLesson: "Neural Networks Basics",
    thumbnail: "/ml-course.jpg",
    category: "AI & Data Science",
    estimatedTime: "2h 15m remaining",
    totalLessons: 12,
    completedLessons: 9,
    lastAccessed: "2 days ago",
    hasARContent: true,
    hasAITutor: true,
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    instructor: "Jason Rodriguez",
    progress: 45,
    nextLesson: "CSS Layouts and Flexbox",
    thumbnail: "/webdev-course.jpg",
    category: "Programming",
    estimatedTime: "4h 30m remaining",
    totalLessons: 15,
    completedLessons: 7,
    lastAccessed: "Today",
    hasARContent: false,
    hasAITutor: true,
  },
  {
    id: 3,
    title: "Data Visualization Mastery",
    instructor: "Maria Gonzalez",
    progress: 90,
    nextLesson: "Interactive Dashboards",
    thumbnail: "/dataviz-course.jpg",
    category: "Data Science",
    estimatedTime: "1h remaining",
    totalLessons: 10,
    completedLessons: 9,
    lastAccessed: "Yesterday",
    hasARContent: true,
    hasAITutor: true,
  },
  {
    id: 4,
    title: "Advanced Natural Language Processing",
    instructor: "Dr. Alex Johnson",
    progress: 30,
    nextLesson: "Transformers Architecture",
    thumbnail: "/nlp-course.jpg",
    category: "AI & Data Science",
    estimatedTime: "5h 45m remaining",
    totalLessons: 14,
    completedLessons: 4,
    lastAccessed: "3 days ago",
    hasARContent: true,
    hasAITutor: true,
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    instructor: "Emma Smith",
    progress: 60,
    nextLesson: "User Research Methods",
    thumbnail: "/ux-course.jpg",
    category: "Design",
    estimatedTime: "3h remaining",
    totalLessons: 12,
    completedLessons: 7,
    lastAccessed: "Today",
    hasARContent: false,
    hasAITutor: true,
  },
];

// Activity data
const activityData = [
  {
    id: 1,
    type: "assignment",
    title: "Machine Learning Algorithm Analysis",
    course: "Introduction to Machine Learning",
    dueDate: "Tomorrow",
    status: "pending",
  },
  {
    id: 2,
    type: "quiz",
    title: "CSS Fundamentals Quiz",
    course: "Web Development Fundamentals",
    dueDate: "In 3 days",
    status: "pending",
  },
  {
    id: 3,
    type: "session",
    title: "Data Visualization Workshop",
    course: "Data Visualization Mastery",
    date: "Today, 3:00 PM",
    status: "upcoming",
  },
  {
    id: 4,
    type: "feedback",
    title: "Project Feedback Received",
    course: "UI/UX Design Principles",
    date: "Yesterday",
    status: "completed",
  },
];

// Achievement data
const achievementData = [
  { id: 1, title: "Learning Streak", description: "Completed learning activities for 7 days in a row", value: 7, max: 10, icon: TrendingUp },
  { id: 2, title: "Quiz Master", description: "Achieved perfect scores on 5 quizzes", value: 5, max: 10, icon: Star },
  { id: 3, title: "Course Completer", description: "Finished 3 full courses", value: 3, max: 5, icon: Trophy },
];

export default function Dashboard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const getProgressColor = (value: number) => {
    if (value < 30) return "bg-red-500";
    if (value < 70) return "bg-yellow-500";
    return "bg-sidebar-primary";
  };

  const getHeatmapColor = (value: number) => {
    if (value < 3) return "bg-[#2b2c30]";
    if (value < 5) return "bg-[#2a5254]";
    if (value < 8) return "bg-[#2a8586]";
    return "bg-[#45f0df]";
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <motion.h1 
                className="text-3xl font-bold tracking-tight"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Welcome back, Alex
              </motion.h1>
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Continue your learning journey where you left off.
              </motion.p>
            </div>
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="outline" className="h-9" asChild>
                <Link href="/calendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Link>
              </Button>
              <Button className="h-9 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" asChild>
                <Link href="/ai-tutor">
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  AI Tutor
                </Link>
              </Button>
            </motion.div>
          </div>
            
          {/* Learning Progress Summary */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="neomorphic">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-sidebar-primary" />
                    Weekly Study Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12.5 hrs</div>
                  <div className="text-xs text-muted-foreground mt-1">+2.3 hrs from last week</div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Goal: 15 hrs/week</span>
                      <span>{Math.round((12.5/15) * 100)}%</span>
                    </div>
                    <Progress value={(12.5/15) * 100} className="h-2" indicatorClassName="bg-sidebar-primary" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="neomorphic">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-sidebar-primary" />
                    Course Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{progress}%</div>
                  <div className="text-xs text-muted-foreground mt-1">Overall completion rate</div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Active courses: 4</span>
                      <span>Completed: 2</span>
                    </div>
                    <Progress value={progress} className="h-2" indicatorClassName={getProgressColor(progress)} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="neomorphic">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-sidebar-primary" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">7</div>
                  <div className="text-xs text-muted-foreground mt-1">Total badges earned</div>
                  <div className="mt-4 grid grid-cols-5 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-md ${i < 3 ? "bg-sidebar-primary/80" : "bg-muted/30"} flex items-center justify-center`}
                      >
                        {i < 3 && <Star className="h-4 w-4 text-sidebar-primary-foreground" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
        
        {/* Current Courses */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">My Courses</h2>
            <Button variant="ghost" asChild>
              <Link href="/courses" className="text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courseData.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden card-hover-effect border-border/50 bg-card/50 h-full flex flex-col">
                  <div className="h-36 bg-muted relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-sidebar-primary/20 to-transparent opacity-70"></div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      {course.hasARContent && (
                        <Badge variant="secondary" className="h-6 bg-background/80 backdrop-blur-sm">
                          <Camera className="h-3 w-3 mr-1" />
                          AR
                        </Badge>
                      )}
                      {course.hasAITutor && (
                        <Badge variant="secondary" className="h-6 bg-background/80 backdrop-blur-sm">
                          <Brain className="h-3 w-3 mr-1" />
                          AI
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-sidebar-primary hover:bg-sidebar-primary/90">
                        {course.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Avatar className="h-5 w-5 mr-1">
                        <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 flex-1">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span>{course.completedLessons} of {course.totalLessons} lessons</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress 
                      value={course.progress} 
                      className="h-1.5 mb-3" 
                      indicatorClassName={getProgressColor(course.progress)} 
                    />
                    <div className="text-sm">
                      <span className="text-muted-foreground">Next:</span> {course.nextLesson}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      {course.estimatedTime}
                    </div>
                    <div>{course.lastAccessed}</div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Upcoming Activities & Achievements */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Upcoming Activities</h2>
            <div className="space-y-3">
              {activityData.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.type === 'assignment' ? 'bg-indigo-500/10' :
                        activity.type === 'quiz' ? 'bg-yellow-500/10' :
                        activity.type === 'session' ? 'bg-sidebar-primary/10' : 'bg-green-500/10'
                      }`}>
                        {activity.type === 'assignment' && <BookOpen className="h-5 w-5 text-indigo-500" />}
                        {activity.type === 'quiz' && <Brain className="h-5 w-5 text-yellow-500" />}
                        {activity.type === 'session' && <Video className="h-5 w-5 text-sidebar-primary" />}
                        {activity.type === 'feedback' && <MessageSquare className="h-5 w-5 text-green-500" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">{activity.course}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          activity.status === 'pending' ? 'outline' :
                          activity.status === 'upcoming' ? 'secondary' : 'default'
                        }>
                          {activity.dueDate || activity.date}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Achievements</h2>
            <div className="space-y-3">
              {achievementData.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 rounded-full bg-sidebar-primary/10 flex items-center justify-center">
                          <achievement.icon className="h-4 w-4 text-sidebar-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{achievement.value}/{achievement.max}</span>
                      </div>
                      <Progress value={(achievement.value / achievement.max) * 100} className="h-1.5" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
