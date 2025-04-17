"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Send, 
  BrainCircuit, 
  BookOpen, 
  Lightbulb, 
  Image as ImageIcon, 
  Code, 
  MoveRight, 
  Sparkles,
  X,
  Zap,
  Search,
  Clock,
  ThumbsUp,
  ThumbsDown,
  BadgeHelp,
  Paperclip
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock conversation data
const initialMessages = [
  {
    id: 1,
    sender: "ai",
    content: "👋 Hi there! I'm your AI learning assistant. I can help you understand concepts, explain code, create visualizations, and more. What would you like to learn about today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    sentiment: "neutral",
  },
  {
    id: 2,
    sender: "user",
    content: "Can you explain how neural networks learn through backpropagation?",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    sentiment: "neutral",
  },
  {
    id: 3,
    sender: "ai",
    content: "Backpropagation is the key algorithm that allows neural networks to learn from data. Here's how it works:\n\n1. Forward pass: Input data flows through the network to produce an output\n2. Error calculation: The difference between the output and the expected result is measured\n3. Backward pass: The error is propagated backward through the network\n4. Weight updates: Connection weights are adjusted to reduce the error\n\nThis process minimizes the error function through gradient descent, allowing the network to improve its predictions over time.",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    sentiment: "positive",
    visualization: {
      type: "image",
      url: "https://miro.medium.com/max/1400/1*3fA77_mLNiJTSgZFhYnU0Q.png",
      caption: "Backpropagation visualization"
    }
  },
  {
    id: 4,
    sender: "user",
    content: "Can you show me a simple Python example of implementing backpropagation?",
    timestamp: new Date(Date.now() - 1000 * 60).toISOString(),
    sentiment: "neutral",
  },
  {
    id: 5,
    sender: "ai",
    content: "Here's a simplified example of implementing backpropagation for a basic neural network with one hidden layer using NumPy:",
    timestamp: new Date().toISOString(),
    sentiment: "positive",
    code: `import numpy as np

class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size, learning_rate=0.1):
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.output_size = output_size
        self.learning_rate = learning_rate
        
        # Initialize weights randomly
        self.W1 = np.random.randn(self.input_size, self.hidden_size) * 0.01
        self.b1 = np.zeros((1, self.hidden_size))
        self.W2 = np.random.randn(self.hidden_size, self.output_size) * 0.01
        self.b2 = np.zeros((1, self.output_size))
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)
    
    def forward(self, X):
        # Forward propagation
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def backward(self, X, y, output):
        # Backpropagation
        self.error = y - output
        self.delta_output = self.error * self.sigmoid_derivative(output)
        
        self.error_hidden = self.delta_output.dot(self.W2.T)
        self.delta_hidden = self.error_hidden * self.sigmoid_derivative(self.a1)
        
        # Update weights and biases
        self.W2 += self.a1.T.dot(self.delta_output) * self.learning_rate
        self.b2 += np.sum(self.delta_output, axis=0, keepdims=True) * self.learning_rate
        self.W1 += X.T.dot(self.delta_hidden) * self.learning_rate
        self.b1 += np.sum(self.delta_hidden, axis=0, keepdims=True) * self.learning_rate
    
    def train(self, X, y, epochs=10000):
        for epoch in range(epochs):
            output = self.forward(X)
            self.backward(X, y, output)
            
            if epoch % 1000 == 0:
                loss = np.mean(np.square(y - output))
                print(f"Epoch {epoch}, Loss: {loss}")
    
    def predict(self, X):
        return self.forward(X)

# Example usage
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])  # XOR input
y = np.array([[0], [1], [1], [0]])  # XOR output

nn = NeuralNetwork(input_size=2, hidden_size=4, output_size=1)
nn.train(X, y)

# Test the trained network
predictions = nn.predict(X)
print("Predictions:")
print(predictions)`
  },
];

// Quick action suggestions
const quickActions = [
  "Explain gradient descent",
  "Show me a CNN architecture diagram",
  "How does LSTM prevent vanishing gradients?",
  "Create a decision tree visualization",
  "Compare supervised vs unsupervised learning"
];

// Recent topics
const recentTopics = [
  "Neural Networks",
  "Backpropagation",
  "Convolutional Networks",
  "Transformers",
  "Reinforcement Learning"
];

export default function AITutor() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [sentiment, setSentiment] = useState("neutral");
  const [isTyping, setIsTyping] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate AI typing response
  const simulateResponse = (query: string) => {
    setIsTyping(true);

    // Choose a random sentiment for demo purposes
    const sentiments = ["positive", "neutral", "neutral", "positive"];
    const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    
    // Set the chat background sentiment
    setSentiment(randomSentiment);

    setTimeout(() => {
      setIsTyping(false);
      
      const newMessage = {
        id: messages.length + 1,
        sender: "ai",
        content: `I'm analyzing your question about "${query}"... This is a simulated response. In a real implementation, this would be processed by an AI model that provides accurate information about your query.`,
        timestamp: new Date().toISOString(),
        sentiment: randomSentiment,
      };
      
      setMessages([...messages, newMessage]);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
      sentiment: "neutral",
    };
    
    setMessages([...messages, userMessage]);
    simulateResponse(inputMessage);
    setInputMessage("");
    setShowActions(false);
  };
  
  const handleQuickAction = (action: string) => {
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: action,
      timestamp: new Date().toISOString(),
      sentiment: "neutral",
    };
    
    setMessages([...messages, userMessage]);
    simulateResponse(action);
    setShowActions(false);
  };
  
  // Function to get the avatar component based on sender
  const getAvatar = (sender: string) => {
    if (sender === "ai") {
      return (
        <Avatar className="h-10 w-10 border border-[#45f0df]">
          <AvatarImage src="/ai-avatar.png" alt="AI" />
          <AvatarFallback className="bg-[#45f0df]/20 text-[#45f0df]">
            <BrainCircuit className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      );
    }
    
    return (
      <Avatar className="h-10 w-10">
        <AvatarImage src="/user-avatar.png" alt="User" />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
    );
  };
  
  // Function to get sentiment background class
  const getSentimentClass = (sentiment: string) => {
    switch(sentiment) {
      case "positive":
        return "sentiment-bg-positive";
      case "negative":
        return "sentiment-bg-negative";
      default:
        return "bg-card";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="p-2" asChild>
              <a href="/">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <div>
              <h1 className="text-lg font-bold">AI Learning Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Your personal tutor powered by AI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-[#45f0df]/10 text-[#45f0df]">
              <BrainCircuit className="mr-1 h-3 w-3" />
              Advanced Mode
            </Badge>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* 3D Avatar Panel (Left Side) */}
        <div className="w-80 border-r border-border hidden lg:block">
          <div className="h-full p-4 flex flex-col">
            <div className="bg-gradient-to-b from-black to-gray-900 rounded-lg aspect-square mb-4 neomorphic overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit className="h-24 w-24 text-[#45f0df]/30" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-sm text-white">AI Assistant (Online)</p>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="topics" className="flex-1">
              <TabsList className="neomorphic-inset w-full">
                <TabsTrigger value="topics" className="flex-1">Recent Topics</TabsTrigger>
                <TabsTrigger value="stats" className="flex-1">Learning Stats</TabsTrigger>
              </TabsList>
              
              <TabsContent value="topics" className="mt-4 flex-1">
                <Card className="neomorphic">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Recently Discussed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {recentTopics.map((topic, index) => (
                        <li key={index}>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-left text-sm"
                            onClick={() => handleQuickAction(`Tell me more about ${topic}`)}
                          >
                            <BookOpen className="mr-2 h-4 w-4 text-[#45f0df]" />
                            {topic}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="stats" className="mt-4">
                <Card className="neomorphic">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Machine Learning</span>
                          <span>78%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#45f0df] rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Neural Networks</span>
                          <span>92%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#45f0df] rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Computer Vision</span>
                          <span>45%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#45f0df] rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>NLP</span>
                          <span>63%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#45f0df] rounded-full" style={{ width: "63%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Chat Area (Right Side) */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : ""}`}
              >
                {message.sender === "ai" && getAvatar("ai")}
                
                <div className={`max-w-[80%] ${message.sender === "user" ? "order-1" : "order-2"}`}>
                  <Card className={`${message.sender === "ai" ? getSentimentClass(message.sentiment) : "bg-primary"} overflow-hidden`}>
                    <CardContent className={`p-3 ${message.sender === "ai" ? "text-gray-900" : "text-primary-foreground"}`}>
                      <div className="whitespace-pre-line">{message.content}</div>
                      
                      {/* Show visualization if it exists */}
                      {message.visualization && (
                        <div className="mt-3 bg-black/20 rounded-md overflow-hidden">
                          <img 
                            src={message.visualization.url} 
                            alt={message.visualization.caption}
                            className="w-full h-auto rounded-md"
                          />
                          <div className="p-2 text-sm text-center">
                            {message.visualization.caption}
                          </div>
                        </div>
                      )}
                      
                      {/* Show code block if it exists */}
                      {message.code && (
                        <div className="mt-3 bg-black rounded-md overflow-hidden">
                          <div className="bg-gray-900 px-3 py-1 flex items-center justify-between text-white">
                            <div className="flex items-center">
                              <Code className="h-4 w-4 mr-2" />
                              <span className="text-xs">Python</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 px-2">
                              <span className="text-xs">Copy</span>
                            </Button>
                          </div>
                          <pre className="p-3 text-sm overflow-x-auto text-gray-300">
                            <code>{message.code}</code>
                          </pre>
                        </div>
                      )}
                      
                      {message.sender === "ai" && (
                        <div className="flex items-center justify-end gap-2 mt-2">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <div className="text-xs text-muted-foreground mt-1 px-1">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {message.sender === "user" && getAvatar("user")}
              </div>
            ))}
            
            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                {getAvatar("ai")}
                <Card className="bg-card max-w-[80%]">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 bg-[#45f0df] rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-[#45f0df] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="h-2 w-2 bg-[#45f0df] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick Actions */}
          <AnimatePresence>
            {showActions && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="px-4 py-2 border-t border-border"
              >
                <div className="flex items-center mb-2">
                  <Zap className="h-4 w-4 text-[#45f0df] mr-2" />
                  <span className="text-sm font-medium">Quick Actions</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask a question or share a concept you'd like to learn..."
                  className="pr-10"
                />
                {inputMessage && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setInputMessage("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button onClick={handleSendMessage} className="shrink-0 bg-[#45f0df] text-primary hover:bg-[#32d8c8]">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <BadgeHelp className="h-3 w-3 mr-1" />
                  <span className="text-xs">Help</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-7 px-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="text-xs">History</span>
                </Button>
              </div>
              <div>
                <Badge variant="outline" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1 text-[#45f0df]" />
                  AI-Enhanced Learning
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 