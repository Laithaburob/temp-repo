"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  PhoneOff,
  Users,
  MessageSquare,
  MoreVertical,
  Send,
  Hand,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Participant {
  id: string;
  userId: string;
  name: string;
  role: string;
  isHost: boolean;
  isSpeaking: boolean;
  hasHandRaised: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  senderRole: string;
  content: string;
  timestamp: string;
}

export default function VirtualClassroom() {
  const router = useRouter();
  const { classroomId } = useParams();
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [handRaised, setHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState("participants");
  const [layoutMode, setLayoutMode] = useState("gallery");
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<{ [key: string]: MediaStream }>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  const ws = useRef<WebSocket | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);
  const currentUser = useRef<{ id: string; name: string; role: string }>({
    id: "user_123", // Replace with actual user data from auth
    name: "Alex Johnson",
    role: "Student"
  });

  // WebSocket Connection
  useEffect(() => {
    const setupWebSocket = async () => {
      ws.current = new WebSocket(`ws://localhost:8000/ws/${classroomId}/${currentUser.current.id}`);
      
      ws.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        switch(data.type) {
          case 'participants':
            setParticipants(data.data);
            break;
          case 'chat_message':
            setChatMessages(prev => [...prev, data.data]);
            break;
          case 'participant_update':
            setParticipants(prev => prev.map(p => 
              p.userId === data.data.userId ? { ...p, ...data.data } : p
            ));
            break;
          case 'hand_raise':
            setParticipants(prev => prev.map(p => 
              p.userId === data.data.userId ? { ...p, hasHandRaised: data.data.state } : p
            ));
            break;
          case 'offer':
            await handleOffer(data);
            break;
          case 'answer':
            await handleAnswer(data);
            break;
          case 'candidate':
            await handleCandidate(data);
            break;
        }
      };
    };

    setupWebSocket();
    return () => ws.current?.close();
  }, [classroomId]);

  // WebRTC Setup
  useEffect(() => {
    const initWebRTC = async () => {
      pc.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });

      // Setup local stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      setLocalStream(stream);
      
      // Add local tracks to peer connection
      stream.getTracks().forEach(track => {
        pc.current?.addTrack(track, stream);
      });

      // Handle remote tracks
      pc.current.ontrack = (event) => {
        const [remoteStream] = event.streams;
        setRemoteStreams(prev => ({
          ...prev,
          [event.track.id]: remoteStream
        }));
      };

      // ICE Candidate handling
      pc.current.onicecandidate = (event) => {
        if (event.candidate && ws.current) {
          ws.current.send(JSON.stringify({
            type: "candidate",
            candidate: event.candidate
          }));
        }
      };
    };

    initWebRTC();
    return () => {
      localStream?.getTracks().forEach(track => track.stop());
      pc.current?.close();
    };
  }, []);

  const handleOffer = async (offer: any) => {
    if (!pc.current) return;
    await pc.current.setRemoteDescription(offer);
    const answer = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answer);
    ws.current?.send(JSON.stringify(answer));
  };

  const handleAnswer = async (answer: any) => {
    if (!pc.current) return;
    await pc.current.setRemoteDescription(answer);
  };

  const handleCandidate = async (candidate: any) => {
    if (!pc.current) return;
    await pc.current.addIceCandidate(candidate);
  };

  const toggleMedia = async (type: 'audio' | 'video') => {
    if (!localStream) return;
    const newState = type === 'audio' ? !micEnabled : !videoEnabled;
    
    localStream.getTracks().forEach(track => {
      if (track.kind === type) track.enabled = newState;
    });

    type === 'audio' ? setMicEnabled(newState) : setVideoEnabled(newState);
    
    ws.current?.send(JSON.stringify({
      type: "participant_update",
      isMuted: type === 'audio' ? !newState : undefined,
      isVideoOff: type === 'video' ? !newState : undefined
    }));
  };

  const handleScreenShare = async () => {
    if (!pc.current) return;
    const screenStream = await navigator.mediaDevices.getDisplayMedia();
    const screenTrack = screenStream.getVideoTracks()[0];
    
    const sender = pc.current.getSenders().find(
      s => s.track?.kind === 'video'
    );
    
    if (sender) {
      sender.replaceTrack(screenTrack);
      setIsScreenSharing(true);
      
      screenTrack.onended = () => {
        localStream?.getVideoTracks()[0]?.enabled && 
          sender.replaceTrack(localStream.getVideoTracks()[0]);
        setIsScreenSharing(false);
      };
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !ws.current) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: currentUser.current.name,
      senderRole: currentUser.current.role,
      content: messageInput,
      timestamp: new Date().toISOString(),
    };

    ws.current.send(JSON.stringify({
      type: "chat_message",
      data: newMessage
    }));
    
    setMessageInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="px-6 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Neural Network Architectures Lecture</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Course: Advanced Machine Learning</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {participants.length} Participants
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-[#45f0df]/10 text-[#45f0df]">
            Recording
          </Badge>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Lecture Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-4">
                <div className="flex justify-between items-center">
                  <span>Enable AI note-taking</span>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Record lecture</span>
                  <Button variant="outline" size="sm">Start</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="flex-1 flex">
        <div className={`flex-1 p-4 ${isSidebarOpen ? 'pr-0' : 'pr-4'}`}>
          <div className="h-full flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant={layoutMode === "gallery" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLayoutMode("gallery")}
                >
                  Gallery View
                </Button>
                <Button 
                  variant={layoutMode === "speaker" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setLayoutMode("speaker")}
                >
                  Speaker View
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
              </Button>
            </div>

            <div className="flex-1 relative">
              {layoutMode === "gallery" && (
                <div className="grid grid-cols-3 gap-4">
                  {participants.map(participant => (
                    <div key={participant.userId} className="relative aspect-video">
                      <video
                        ref={participant.userId === currentUser.current.id ? localVideoRef : null}
                        className="w-full h-full object-cover rounded-lg"
                        autoPlay
                        playsInline
                        muted={participant.userId === currentUser.current.id}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <span className="text-white text-sm">{participant.name}</span>
                        {participant.isMuted && <MicOff className="h-4 w-4 text-red-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {layoutMode === "speaker" && (
                <div className="grid grid-rows-[1fr_auto] gap-4">
                  <div className="relative">
                    <video
                      className="w-full h-full object-contain rounded-lg"
                      autoPlay
                      playsInline
                    />
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gray-900 p-2 rounded-lg flex items-center gap-2">
                  <Button 
                    variant={micEnabled ? "ghost" : "destructive"} 
                    size="icon"
                    onClick={() => toggleMedia('audio')}
                  >
                    {micEnabled ? <Mic /> : <MicOff />}
                  </Button>
                  <Button 
                    variant={videoEnabled ? "ghost" : "destructive"} 
                    size="icon"
                    onClick={() => toggleMedia('video')}
                  >
                    {videoEnabled ? <Video /> : <VideoOff />}
                  </Button>
                  <Button 
                    variant={isScreenSharing ? "default" : "ghost"} 
                    size="icon"
                    onClick={handleScreenShare}
                  >
                    <ScreenShare />
                  </Button>
                  <Button 
                    variant={handRaised ? "default" : "ghost"} 
                    size="icon"
                    onClick={() => setHandRaised(!handRaised)}
                  >
                    <Hand />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <PhoneOff />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isSidebarOpen && (
          <div className="w-80 border-l border-border flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
              </TabsList>
              
              <TabsContent value="participants" className="flex-1 overflow-y-auto">
                {participants.map(participant => (
                  <div key={participant.userId} className="p-3 flex items-center gap-3 border-b">
                    <Avatar>
                      <AvatarFallback>
                        {participant.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span>{participant.name}</span>
                        {participant.isHost && <Crown className="h-4 w-4 text-[#45f0df]" />}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {participant.role}
                      </span>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="chat" className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {chatMessages.map(message => (
                    <div key={message.id} className="flex gap-2">
                      <Avatar>
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{message.sender}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}