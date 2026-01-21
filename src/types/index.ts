export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodType;
  intensity: number; // 1-10
  timestamp: Date;
  source: 'spotify' | 'youtube' | 'apple_music' | 'manual';
  metadata?: {
    tracks?: string[];
    genres?: string[];
    tempo?: number;
    energy?: number;
  };
}

export type MoodType = 
  | 'happy'
  | 'sad'
  | 'energetic'
  | 'calm'
  | 'anxious'
  | 'content'
  | 'excited'
  | 'melancholic';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  connectedServices: {
    spotify?: boolean;
    youtube?: boolean;
    appleMusic?: boolean;
  };
  createdAt: Date;
  lastActive: Date;
}

export interface TimelineEvent {
  id: string;
  date: Date;
  mood: MoodType;
  intensity: number;
  description?: string;
}

export interface AIInsight {
  id: string;
  userId: string;
  content: string;
  type: 'pattern' | 'suggestion' | 'observation';
  confidence: number;
  createdAt: Date;
}
