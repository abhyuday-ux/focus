
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TimerView } from './components/TimerView';
import { CalendarView } from './components/CalendarView';
import { AnalysisView } from './components/AnalysisView';
import { SettingsView } from './components/SettingsView';
import { TasksView } from './components/TasksView';
import { ViewType, StudySession, Subject, Task, AppTheme } from './types';
import { storageService } from './services/storageService';
import { THEMES } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('timer');
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dailyGoal, setDailyGoal] = useState<number>(14400);
  
  // Appearance state
  const [themeId, setThemeId] = useState<string>('ypt');
  const [wallpaper, setWallpaper] = useState<string>('none');

  // Initial load
  useEffect(() => {
    setSessions(storageService.getSessions());
    setSubjects(storageService.getSubjects());
    setTasks(storageService.getTasks());
    setDailyGoal(storageService.getDailyGoal());
    setThemeId(storageService.getThemeId());
    setWallpaper(storageService.getWallpaper());
  }, []);

  const currentTheme = useMemo(() => 
    THEMES.find(t => t.id === themeId) || THEMES[0], 
  [themeId]);

  // Apply theme to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', currentTheme.accent);
  }, [currentTheme]);

  const handleSessionComplete = useCallback((newSession: StudySession) => {
    storageService.saveSession(newSession);
    setSessions(prev => [...prev, newSession]);
  }, []);

  const handleSubjectsChange = useCallback((newSubjects: Subject[]) => {
    storageService.saveSubjects(newSubjects);
    setSubjects(newSubjects);
  }, []);

  const handleTasksChange = useCallback((newTasks: Task[]) => {
    storageService.saveTasks(newTasks);
    setTasks(newTasks);
  }, []);

  const handleGoalChange = useCallback((newGoal: number) => {
    storageService.saveDailyGoal(newGoal);
    setDailyGoal(newGoal);
  }, []);

  const handleThemeChange = (id: string) => {
    setThemeId(id);
    storageService.saveThemeId(id);
  };

  const handleWallpaperChange = (val: string) => {
    setWallpaper(val);
    storageService.saveWallpaper(val);
  };

  const renderView = () => {
    switch (activeView) {
      case 'timer':
        return (
          <TimerView 
            subjects={subjects} 
            sessions={sessions}
            dailyGoal={dailyGoal}
            theme={currentTheme}
            onSessionComplete={handleSessionComplete} 
          />
        );
      case 'tasks':
        return <TasksView tasks={tasks} subjects={subjects} onTasksChange={handleTasksChange} theme={currentTheme} />;
      case 'calendar':
        return <CalendarView sessions={sessions} subjects={subjects} theme={currentTheme} />;
      case 'analysis':
        return <AnalysisView sessions={sessions} subjects={subjects} theme={currentTheme} />;
      case 'settings':
        return (
          <SettingsView 
            subjects={subjects} 
            onSubjectsChange={handleSubjectsChange} 
            dailyGoal={dailyGoal}
            onGoalChange={handleGoalChange}
            themeId={themeId}
            onThemeChange={handleThemeChange}
            wallpaper={wallpaper}
            onWallpaperChange={handleWallpaperChange}
            theme={currentTheme}
          />
        );
      default:
        return <TimerView subjects={subjects} sessions={sessions} dailyGoal={dailyGoal} theme={currentTheme} onSessionComplete={handleSessionComplete} />;
    }
  };

  const backgroundStyle = useMemo(() => {
    if (wallpaper === 'none') return {};
    if (wallpaper.startsWith('linear-gradient') || wallpaper.startsWith('radial-gradient')) {
      return { background: wallpaper };
    }
    return { 
      backgroundImage: `url(${wallpaper})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    };
  }, [wallpaper]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-inter selection:bg-orange-500/30">
      <Sidebar activeView={activeView} onViewChange={setActiveView} theme={currentTheme} />
      <main 
        className="flex-1 overflow-y-auto relative h-full transition-all duration-700 ease-in-out"
        style={backgroundStyle}
      >
        {/* Overlay to ensure readability if wallpaper is bright */}
        {wallpaper !== 'none' && <div className="absolute inset-0 bg-slate-950/40 pointer-events-none backdrop-blur-[2px]"></div>}
        <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
