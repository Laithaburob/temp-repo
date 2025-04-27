
export interface Comment {
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

export interface Attachment {
  id: number;
  name: string;
  type: string;
  size: string;
}

export interface Communication {
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string | null;
  courses: Array<{
    id: string;
    name: string;
  }>;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string | null;
  members?: number;
}
