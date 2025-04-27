
import { useState } from "react";
import { UserProfile, Communication, Contact, Attachment } from "@/types/messages";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  X, 
  Plus,
  Paperclip,
  Calendar,
  Send,
  User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ComposeDialogProps {
  showComposeDialog: boolean;
  setShowComposeDialog: (show: boolean) => void;
  composeType: string;
  setComposeType: (type: string) => void;
  composeTitle: string;
  setComposeTitle: (title: string) => void;
  composeContent: string;
  setComposeContent: (content: string) => void;
  composeRecipient: string;
  setComposeRecipient: (recipient: string) => void;
  composeCourse: string;
  setComposeCourse: (course: string) => void;
  composeDueDate: string;
  setComposeDueDate: (dueDate: string) => void;
  attachments: Attachment[];
  setAttachments: (attachments: Attachment[]) => void;
  userProfile: UserProfile;
  contacts: Contact[];
  communications: Communication[];
  setCommunications: (communications: Communication[]) => void;
}

export const ComposeDialog = ({
  showComposeDialog,
  setShowComposeDialog,
  composeType,
  setComposeType,
  composeTitle,
  setComposeTitle,
  composeContent,
  setComposeContent,
  composeRecipient,
  setComposeRecipient,
  composeCourse,
  setComposeCourse,
  composeDueDate,
  setComposeDueDate,
  attachments,
  setAttachments,
  userProfile,
  contacts,
  communications,
  setCommunications
}: ComposeDialogProps) => {
  const [selectedContactsForDisplay, setSelectedContactsForDisplay] = useState<Contact[]>([]);

  const handleSubmit = () => {
    if (!composeTitle || !composeContent || !composeRecipient) return;
    
    const recipientObj = contacts.find(contact => contact.id === composeRecipient) || {
      id: "unknown",
      name: "Unknown",
      avatar: null,
      role: "Unknown",
      department: "Unknown"
    };
    
    const newCommunication: Communication = {
      id: `c${communications.length + 1}`.padStart(5, '0'),
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
    };
    
    if (composeType === "assignment" && composeDueDate) {
      newCommunication.dueDate = new Date(composeDueDate).toISOString();
      newCommunication.status = "pending";
    }
    
    setCommunications([newCommunication, ...communications]);
    
    // Reset form
    setComposeType("message");
    setComposeTitle("");
    setComposeContent("");
    setComposeRecipient("");
    setComposeCourse("");
    setComposeDueDate("");
    setAttachments([]);
    setShowComposeDialog(false);
  };
  
  const handleAttachment = () => {
    // Simulate adding an attachment
    const newAttachment = {
      id: attachments.length + 1,
      name: `Document-${attachments.length + 1}.pdf`,
      type: "document",
      size: "1.2 MB",
    };
    
    setAttachments([...attachments, newAttachment]);
  };
  
  const handleRemoveAttachment = (id: number) => {
    setAttachments(attachments.filter(attachment => attachment.id !== id));
  };
  
  const handleSelectRecipient = (contactId: string) => {
    setComposeRecipient(contactId);
    
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setSelectedContactsForDisplay([contact]);
    }
  };
  
  return (
    <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>New Communication</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="text-sm font-medium block mb-2">Type</label>
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
            
            <div className="md:col-span-2">
              <label className="text-sm font-medium block mb-2">Course</label>
              <Select value={composeCourse} onValueChange={setComposeCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {userProfile.courses.map(course => (
                    <SelectItem key={course.id} value={course.name}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-2">To</label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Select value={composeRecipient} onValueChange={handleSelectRecipient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map(contact => (
                      <SelectItem key={contact.id} value={contact.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            {contact.avatar ? (
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                            ) : (
                              <AvatarFallback>{contact.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            )}
                          </Avatar>
                          <span>{contact.name}</span>
                          <span className="text-xs text-muted-foreground">({contact.role})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedContactsForDisplay.map(contact => (
                <Badge key={contact.id} className="flex items-center gap-1 py-2 pl-1 pr-1">
                  <Avatar className="h-5 w-5 mr-1">
                    {contact.avatar ? (
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                    ) : (
                      <AvatarFallback>{contact.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    )}
                  </Avatar>
                  <span>{contact.name}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-4 w-4 rounded-full"
                    onClick={() => {
                      setComposeRecipient("");
                      setSelectedContactsForDisplay([]);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-2">Title</label>
            <Input 
              placeholder="Enter title" 
              value={composeTitle} 
              onChange={(e) => setComposeTitle(e.target.value)} 
            />
          </div>
          
          {composeType === "assignment" && (
            <div>
              <label className="text-sm font-medium block mb-2">Due Date</label>
              <div className="flex items-center">
                <Input 
                  type="datetime-local" 
                  value={composeDueDate} 
                  onChange={(e) => setComposeDueDate(e.target.value)} 
                  className="flex-1"
                />
                <Button type="button" variant="ghost" size="icon" className="ml-2">
                  <Calendar className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium block mb-2">Content</label>
            <Textarea 
              placeholder="Write your message here..." 
              value={composeContent} 
              onChange={(e) => setComposeContent(e.target.value)} 
              className="min-h-32"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Attachments</label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="h-8" 
                onClick={handleAttachment}
              >
                <Paperclip className="h-4 w-4 mr-1" />
                Attach
              </Button>
            </div>
            
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((attachment) => (
                  <div 
                    key={attachment.id}
                    className="flex items-center justify-between p-2 border border-border rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{attachment.name}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => handleRemoveAttachment(attachment.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!composeTitle || !composeContent || !composeRecipient}>
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
