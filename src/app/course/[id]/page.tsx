"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  SkipBack, 
  SkipForward, 
  PlayCircle, 
  PauseCircle, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Camera, 
  Lightbulb, 
  Smile, 
  Meh, 
  Frown,
  BrainCircuit,
  List,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock transcript data
const transcriptData = [
  { id: 1, time: "00:00", text: "Welcome to our lesson on machine learning fundamentals." },
  { id: 2, time: "00:15", text: "Today we'll explore neural networks and how they form the foundation of modern AI systems." },
  { id: 3, time: "00:30", text: "A neural network is composed of layers of interconnected nodes or 'neurons'." },
  { id: 4, time: "00:45", text: "Each connection between neurons has a weight that adjusts as the network learns." },
  { id: 5, time: "01:00", text: "The input layer receives the initial data, such as image pixels or text features." },
  { id: 6, time: "01:15", text: "Hidden layers process this information through various transformations." },
  { id: 7, time: "01:30", text: "The output layer produces the final prediction or classification." },
  { id: 8, time: "01:45", text: "During training, the network compares its predictions to the correct answers." },
  { id: 9, time: "02:00", text: "It then adjusts the weights through a process called backpropagation." },
  { id: 10, time: "02:15", text: "This iterative process continues until the network achieves acceptable accuracy." },
  { id: 11, time: "02:30", text: "Deep learning refers to neural networks with many hidden layers." },
  { id: 12, time: "02:45", text: "These deep architectures can learn complex patterns in data." },
  { id: 13, time: "03:00", text: "Convolutional neural networks or CNNs are specialized for image processing." },
  { id: 14, time: "03:15", text: "Recurrent neural networks or RNNs handle sequential data like text or time series." },
  { id: 15, time: "03:30", text: "Transformers are a newer architecture that has revolutionized natural language processing." },
];

// Knowledge check questions
const knowledgeChecks = [
  {
    id: 1,
    triggerTime: 60, // in seconds
    question: "What is the purpose of the input layer in a neural network?",
    options: [
      { id: 'a', text: "To produce the final prediction", isCorrect: false },
      { id: 'b', text: "To receive the initial data", isCorrect: true },
      { id: 'c', text: "To adjust the weights", isCorrect: false },
      { id: 'd', text: "To process information through transformations", isCorrect: false },
    ],
  },
  {
    id: 2,
    triggerTime: 120, // in seconds
    question: "What process adjusts the weights in a neural network during training?",
    options: [
      { id: 'a', text: "Forward propagation", isCorrect: false },
      { id: 'b', text: "Gradient descent", isCorrect: false },
      { id: 'c', text: "Backpropagation", isCorrect: true },
      { id: 'd', text: "Feature extraction", isCorrect: false },
    ],
  },
];

// Emotion states for the webcam recognition
const emotionStates = ["neutral", "engaged", "confused", "bored"];

export default function CoursePlayer({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // 4 minutes in seconds
  const [activeTranscript, setActiveTranscript] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<typeof knowledgeChecks[0] | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [emotion, setEmotion] = useState(emotionStates[1]); // Default to "engaged"
  const videoRef = useRef<HTMLDivElement>(null);

  // Simulate video playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          
          // Check if we should show a knowledge check
          const quiz = knowledgeChecks.find(q => q.triggerTime === newTime);
          if (quiz) {
            setCurrentQuiz(quiz);
            setShowQuiz(true);
            setIsPlaying(false);
          }
          
          // Update active transcript
          const newActiveTranscript = transcriptData.findIndex(t => {
            const timeInSeconds = parseInt(t.time.split(':')[0]) * 60 + parseInt(t.time.split(':')[1]);
            return timeInSeconds === newTime;
          });
          
          if (newActiveTranscript !== -1) {
            setActiveTranscript(newActiveTranscript + 1);
          }
          
          // Change emotion state randomly for demo purposes
          if (newTime % 30 === 0) {
            const randomEmotion = emotionStates[Math.floor(Math.random() * emotionStates.length)];
            setEmotion(randomEmotion);
          }
          
          return newTime < duration ? newTime : 0;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, duration]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const jumpToTranscript = (index: number) => {
    const timeString = transcriptData[index].time;
    const minutes = parseInt(timeString.split(':')[0]);
    const seconds = parseInt(timeString.split(':')[1]);
    const newTime = minutes * 60 + seconds;
    
    setCurrentTime(newTime);
    setActiveTranscript(index + 1);
  };
  
  const handleQuizSubmit = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
  };
  
  const continueVideo = () => {
    setShowQuiz(false);
    setCurrentQuiz(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsPlaying(true);
  };
  
  // Get emotion icon and color
  const getEmotionData = () => {
    switch(emotion) {
      case "engaged":
        return { icon: <Smile className="h-5 w-5" />, color: "text-green-400", label: "Engaged" };
      case "confused":
        return { icon: <Meh className="h-5 w-5" />, color: "text-yellow-400", label: "Confused" };
      case "bored":
        return { icon: <Frown className="h-5 w-5" />, color: "text-red-400", label: "Disengaged" };
      default:
        return { icon: <Meh className="h-5 w-5" />, color: "text-gray-400", label: "Neutral" };
    }
  };
  
  const emotionData = getEmotionData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="p-2" asChild>
            <a href="/">
              <ArrowLeft className="h-5 w-5" />
            </a>
          </Button>
          <div>
            <h1 className="text-lg font-bold">Introduction to Machine Learning</h1>
            <p className="text-sm text-muted-foreground">Module 3: Neural Networks Fundamentals</p>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player (Left Side) */}
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden neomorphic">
              {/* Video Container */}
              <div 
                ref={videoRef} 
                className="relative aspect-video bg-black flex items-center justify-center"
              >
                {/* Video Placeholder */}
                <div className="text-center">
                  <BrainCircuit className="h-16 w-16 mx-auto mb-4 text-[#45f0df]/50" />
                  <p className="text-gray-400">Neural Networks Visualization</p>
                </div>
                
                {/* Video Controls Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-white" 
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? 
                          <PauseCircle className="h-8 w-8" /> : 
                          <PlayCircle className="h-8 w-8" />
                        }
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-white"
                        onClick={handleMute}
                      >
                        {isMuted ? 
                          <VolumeX className="h-5 w-5" /> : 
                          <Volume2 className="h-5 w-5" />
                        }
                      </Button>
                      
                      <div className="relative flex-1 mx-2">
                        <Progress 
                          value={(currentTime / duration) * 100} 
                          className="h-1.5" 
                          indicatorClassName="bg-[#45f0df]"
                        />
                      </div>
                      
                      <span className="text-sm text-white">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-white"
                          >
                            <Camera className="h-5 w-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>AR Experience</DialogTitle>
                          </DialogHeader>
                          <div className="aspect-video bg-black rounded-md flex items-center justify-center">
                            <div className="text-center">
                              <GraduationCap className="h-16 w-16 mx-auto mb-4 text-[#45f0df]" />
                              <p className="text-lg font-semibold mb-2">3D Neural Network Model</p>
                              <p className="text-sm text-muted-foreground">
                                Interact with a 3D model of a neural network
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-white"
                      >
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Emotion Recognition Status */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full">
                  <span className={`${emotionData.color}`}>{emotionData.icon}</span>
                  <span className="text-xs text-white">{emotionData.label}</span>
                </div>
                
                {/* AR Preview Button */}
                <Button
                  className="absolute top-4 left-4 bg-[#45f0df] text-primary hover:bg-[#32d8c8] transition-all"
                  size="sm"
                >
                  <Camera className="mr-1 h-4 w-4" />
                  View in AR
                </Button>
              </div>
              
              {/* Video Info and Navigation */}
              <div className="p-4 bg-card border-t border-border">
                <Tabs defaultValue="lessons" className="w-full">
                  <TabsList className="neomorphic-inset mb-4">
                    <TabsTrigger value="lessons">Lessons</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="lessons">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">Neural Networks Fundamentals</h3>
                        <p className="text-sm text-muted-foreground">
                          Lesson 3 of 12 • 8 minutes
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <SkipBack className="mr-1 h-4 w-4" />
                          Previous
                        </Button>
                        <Button size="sm" className="bg-[#45f0df] text-primary hover:bg-[#32d8c8]">
                          Next
                          <SkipForward className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Progress 
                      value={(currentTime / duration) * 100} 
                      className="h-2 mb-4" 
                      indicatorClassName="bg-gradient-to-r from-[#45f0df] to-[#32d8c8]"
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Interactive Transcript (Right Side) */}
          <div>
            <Card className="neomorphic h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Interactive Transcript</CardTitle>
                  <Badge variant="outline" className="bg-[#45f0df]/10 text-[#45f0df]">
                    <List className="mr-1 h-3 w-3" />
                    Transcript
                  </Badge>
                </div>
                <CardDescription>
                  Click on any text to jump to that part of the video
                </CardDescription>
              </CardHeader>
              
              <CardContent className="overflow-y-auto max-h-[calc(100vh-300px)]">
                <div className="space-y-1">
                  {transcriptData.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0.6 }}
                      animate={{ 
                        opacity: activeTranscript === item.id ? 1 : 0.6,
                        backgroundColor: activeTranscript === item.id ? 'rgba(69, 240, 223, 0.1)' : 'transparent',
                      }}
                      className={`p-2 rounded-md cursor-pointer flex hover:bg-[#45f0df]/5 transition-colors`}
                      onClick={() => jumpToTranscript(index)}
                    >
                      <span className="text-sm text-muted-foreground w-10 shrink-0">
                        {item.time}
                      </span>
                      <span className={`text-sm ${activeTranscript === item.id ? 'text-[#45f0df] font-medium' : ''}`}>
                        {item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Knowledge Check Popup */}
      <AnimatePresence>
        {showQuiz && currentQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4"
          >
            <Card className="w-full max-w-lg neomorphic overflow-hidden">
              <CardHeader className="bg-[#45f0df]/20 border-b border-[#45f0df]/30">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-[#45f0df]" />
                  <CardTitle>Knowledge Check</CardTitle>
                </div>
                <CardDescription>
                  Answer this question to continue with the lesson
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <p className="text-lg font-medium mb-6">
                  {currentQuiz.question}
                </p>
                
                <div className="space-y-3">
                  {currentQuiz.options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 rounded-md border border-border cursor-pointer transition-all ${
                        selectedAnswer === option.id 
                          ? 'border-[#45f0df] bg-[#45f0df]/10' 
                          : 'hover:border-[#45f0df]/50'
                      } ${
                        showResult && option.isCorrect 
                          ? 'border-green-500 bg-green-500/10' 
                          : ''
                      } ${
                        showResult && selectedAnswer === option.id && !option.isCorrect 
                          ? 'border-red-500 bg-red-500/10' 
                          : ''
                      }`}
                      onClick={() => !showResult && setSelectedAnswer(option.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded-full border ${
                          selectedAnswer === option.id 
                            ? 'border-[#45f0df] bg-[#45f0df]' 
                            : 'border-muted-foreground'
                        } ${
                          showResult && option.isCorrect 
                            ? 'border-green-500 bg-green-500' 
                            : ''
                        } ${
                          showResult && selectedAnswer === option.id && !option.isCorrect 
                            ? 'border-red-500 bg-red-500' 
                            : ''
                        }`} />
                        <span>{option.id.toUpperCase()}. {option.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between bg-card border-t border-border">
                {!showResult ? (
                  <Button 
                    className="w-full bg-[#45f0df] text-primary hover:bg-[#32d8c8]"
                    disabled={!selectedAnswer}
                    onClick={handleQuizSubmit}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-[#45f0df] text-primary hover:bg-[#32d8c8]"
                    onClick={continueVideo}
                  >
                    Continue Learning
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating AI Assistant Button */}
      <motion.div
        className="fixed bottom-6 right-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <Button 
          size="lg" 
          className="rounded-full h-14 w-14 ai-button-pulse bg-gradient-to-r from-[#45f0df] to-[#32d8c8] text-gray-900"
        >
          <BrainCircuit className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
} 