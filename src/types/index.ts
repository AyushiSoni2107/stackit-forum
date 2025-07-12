export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'guest' | 'user' | 'admin';
  createdAt: Date;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  authorId: string;
  author: User;
  votes: number;
  answerCount: number;
  acceptedAnswerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Answer {
  id: string;
  content: string;
  questionId: string;
  authorId: string;
  author: User;
  votes: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: string;
  userId: string;
  targetId: string;
  targetType: 'question' | 'answer';
  type: 'up' | 'down';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'answer' | 'comment' | 'mention' | 'accepted';
  message: string;
  isRead: boolean;
  createdAt: Date;
  relatedId?: string;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}