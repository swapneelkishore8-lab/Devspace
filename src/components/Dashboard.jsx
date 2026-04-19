import React, { useState } from 'react';
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';

export default function Dashboard({ goals, setGoals, tasks, setTasks, updateStreakLog }) {
  const [newTask, setNewTask] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        if (!t.completed && updateStreakLog) updateStreakLog();
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addGoal = (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }]);
    setNewGoal('');
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        if (!g.completed && updateStreakLog) updateStreakLog();
        return { ...g, completed: !g.completed };
      }
      return g;
    }));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Tasks Section */}
      <div className="glass p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Daily grind
          </h2>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {tasks.filter(t => t.completed).length} / {tasks.length} Completed
          </span>
        </div>
        
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" />
          </button>
        </form>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length === 0 ? (
            <p className="text-center text-slate-500 py-4">No tasks yet. Start the grind!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                task.completed ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-800/80 border-slate-700 hover:border-blue-500/50'
              }`}>
                <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleTask(task.id)}>
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                  <span className={`text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.text}
                  </span>
                </div>
                <button onClick={() => deleteTask(task.id)} className="text-slate-500 hover:text-red-400 transition-colors ml-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Goals Section */}
      <div className="glass p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Macro Goals
          </h2>
          <span className="text-sm font-medium px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {goals.filter(g => g.completed).length} / {goals.length} Achieved
          </span>
        </div>
        
        <form onSubmit={addGoal} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Define a long-term goal..."
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-xl transition-all hover:scale-105 active:scale-95">
            <Plus className="w-5 h-5" />
          </button>
        </form>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {goals.length === 0 ? (
            <p className="text-center text-slate-500 py-4">Set your sights high.</p>
          ) : (
            goals.map(goal => (
              <div key={goal.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                goal.completed ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-800/80 border-slate-700 hover:border-purple-500/50'
              }`}>
                <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => toggleGoal(goal.id)}>
                  {goal.completed ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                  <span className={`text-sm ${goal.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {goal.text}
                  </span>
                </div>
                <button onClick={() => deleteGoal(goal.id)} className="text-slate-500 hover:text-red-400 transition-colors ml-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
