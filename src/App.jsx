import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import MotivationalHero from './components/MotivationalHero';
import TerminalWorkspace from './components/TerminalWorkspace';
import Dashboard from './components/Dashboard';
import SubjectTracker from './components/SubjectTracker';
import ProfileLinks from './components/ProfileLinks';
import { CodeSquare } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useLocalStorage('v2_tasks', []);
  const [goals, setGoals] = useLocalStorage('v2_goals', []);
  const [subjects, setSubjects] = useLocalStorage('v2_subjects', []);
  const [streakData, setStreakData] = useLocalStorage('v2_streak', { count: 0, lastDate: null });

  const kpiCount = tasks.filter(t => t.completed).length + goals.filter(g => g.completed).length;

  const updateStreakLog = () => {
    const today = new Date().toDateString();
    if (streakData.lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (streakData.lastDate === yesterday.toDateString()) {
            setStreakData({ count: streakData.count + 1, lastDate: today });
        } else {
            setStreakData({ count: 1, lastDate: today });
        }
    }
  };

  return (
    <div className="min-h-screen pb-12 bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 mb-8 border-b border-white/10 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
              <CodeSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              DevSpace
            </span>
          </div>
          <div className="text-sm font-medium text-slate-400 hidden md:block group cursor-pointer hover:text-cyan-400 transition-colors">
            $ <span className="underline decoration-cyan-500/50">init workspace</span> 
            <span className="inline-block w-2.5 h-4 ml-1 bg-cyan-400 animate-pulse translate-y-1"></span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 relative">
        <MotivationalHero kpiCount={kpiCount} streakCount={streakData.count} />
        <TerminalWorkspace updateStreakLog={updateStreakLog} />
        <Dashboard 
          tasks={tasks} setTasks={setTasks} 
          goals={goals} setGoals={setGoals} 
          updateStreakLog={updateStreakLog}
        />
        <SubjectTracker 
          subjects={subjects} setSubjects={setSubjects} 
        />
        <ProfileLinks />
      </main>
      
      {/* Footer */}
      <footer className="text-center mt-12 text-slate-600 text-sm">
        <p>Stay Consistent. Stay Disciplined.</p>
        <p className="mt-1">© {new Date().getFullYear()} BTech Tracker</p>
      </footer>
    </div>
  );
}

export default App;
