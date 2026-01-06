
import { Subject, AppTheme } from './types';

export const DEFAULT_SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', color: '#3b82f6' },
  { id: 'coding', name: 'Coding', color: '#10b981' },
  { id: 'english', name: 'English', color: '#f59e0b' },
  { id: 'science', name: 'Science', color: '#ef4444' },
  { id: 'design', name: 'Design', color: '#a855f7' }
];

export const THEMES: AppTheme[] = [
  { id: 'ypt', name: 'YPT Classic', primary: 'orange-500', accent: '#f97316' },
  { id: 'midnight', name: 'Midnight', primary: 'blue-500', accent: '#3b82f6' },
  { id: 'emerald', name: 'Emerald', primary: 'emerald-500', accent: '#10b981' },
  { id: 'rose', name: 'Cyber Rose', primary: 'rose-500', accent: '#f43f5e' },
  { id: 'gold', name: 'Solar Gold', primary: 'amber-400', accent: '#fbbf24' }
];

export const PRESET_WALLPAPERS = [
  { id: 'none', name: 'Pure Dark', value: 'none' },
  { id: 'mesh', name: 'Deep Mesh', value: 'radial-gradient(at 0% 0%, rgba(30, 41, 59, 0.5) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(15, 23, 42, 0.5) 0, transparent 50%), radial-gradient(at 100% 0%, rgba(30, 41, 59, 0.5) 0, transparent 50%)' },
  { id: 'nebula', name: 'Nebula', value: 'linear-gradient(to bottom right, #0f172a, #1e1b4b, #020617)' },
  { id: 'grid', name: 'Cyber Grid', value: 'linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)), url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }
];

export const STORAGE_KEYS = {
  SESSIONS: 'ff_sessions',
  SUBJECTS: 'ff_subjects',
  TASKS: 'ff_tasks',
  DAILY_GOAL: 'ff_daily_goal',
  THEME: 'ff_theme_id',
  WALLPAPER: 'ff_wallpaper_data'
};
