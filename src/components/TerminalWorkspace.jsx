import React, { useState, useEffect } from 'react';
import { TerminalSquare, Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function TerminalWorkspace({ updateStreakLog }) {
  const [terminalTasks, setTerminalTasks] = useLocalStorage('v2_terminal_tasks', []);
  const [inputText, setInputText] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleCommand = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Command parsing
    if (inputText.trim() === 'clear') {
      setTerminalTasks([]);
    } else {
      setTerminalTasks([...terminalTasks, { id: Date.now(), text: inputText, completed: false }]);
    }
    setInputText('');
  };

  const toggleTask = (id) => {
    setTerminalTasks(terminalTasks.map(t => {
      if (t.id === id) {
        if (!t.completed && updateStreakLog) updateStreakLog();
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const removeTask = (id) => {
    setTerminalTasks(terminalTasks.filter(t => t.id !== id));
  };

  // Minimal Calendar Logic
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      
      {/* Quick Todo Terminal */}
      <div className="lg:col-span-2 rounded-xl overflow-hidden bg-[#0d1117] border border-slate-700 shadow-2xl flex flex-col font-mono relative group">
        {/* Terminal Header */}
        <div className="bg-[#161b22] px-4 py-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <TerminalSquare className="w-4 h-4" />
            <span>bash — dev_workspace</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-4 flex-1 flex flex-col h-[300px] overflow-y-auto">
          <div className="mb-4 text-green-400 text-sm">
            <p>Welcome to DevSpace v2.0.0</p>
            <p className="text-slate-500">Type 'clear' to empty tasks. Click a task to toggle.</p>
          </div>

          <div className="flex-1 space-y-2 text-sm">
            {terminalTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-2 group/task">
                <span className="text-pink-500 shrink-0">~</span>
                <span 
                  className={`flex-1 cursor-pointer transition-colors ${task.completed ? 'text-slate-500 line-through' : 'text-slate-300 hover:text-white'}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.text}
                </span>
                <button onClick={() => removeTask(task.id)} className="text-xs text-red-500/0 group-hover/task:text-red-500/80 transition-opacity">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Input Line */}
          <form onSubmit={handleCommand} className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-cyan-400 font-bold shrink-0">dev@local:~$</span>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-slate-200 caret-green-400"
              autoFocus
              spellCheck="false"
            />
          </form>
        </div>
      </div>

      {/* Monthly Calendar */}
      <div className="rounded-xl overflow-hidden bg-slate-900/80 backdrop-blur border border-slate-700 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-slate-200">
            <CalendarIcon className="w-5 h-5 text-indigo-400" />
            <span className="font-bold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-1 hover:bg-slate-800 rounded-md text-slate-400 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextMonth} className="p-1 hover:bg-slate-800 rounded-md text-slate-400 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="py-1">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {blanksArray.map(b => (
            <div key={`blank-${b}`} className="p-2"></div>
          ))}
          {daysArray.map(day => {
            const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
            return (
              <div 
                key={day} 
                className={`p-2 rounded-lg transition-all ${isToday ? 'bg-indigo-500 text-white font-bold ring-2 ring-indigo-400/50' : 'text-slate-300 hover:bg-slate-800 cursor-pointer'}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
