
export interface StudySession {
  id: string;
  subjectId: string;
  duration: number; // in seconds
  startTime: number; // timestamp
  date: string; // YYYY-MM-DD
}

export interface Subject {
  id: string;
  name: string;
  color: string;
}

export type TaskStatus = 'todo' | 'doing' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  subjectId?: string;
}

export type ViewType = 'timer' | 'calendar' | 'analysis' | 'settings' | 'tasks';

export interface AppTheme {
  id: string;
  name: string;
  primary: string; // Tailwind color class like 'orange-500'
  accent: string;  // Hex color
}

export interface DailyAggregated {
  date: string;
  totalDuration: number;
  subjectBreakdown: Record<string, number>;
}
