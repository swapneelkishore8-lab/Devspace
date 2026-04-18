import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, GraduationCap } from 'lucide-react';

export default function SubjectTracker({ subjects, setSubjects }) {
  const [newSubject, setNewSubject] = useState('');
  const [newTarget, setNewTarget] = useState('');

  const addSubject = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    setSubjects([...subjects, { 
      id: Date.now(), 
      name: newSubject, 
      progress: 0, 
      target: newTarget || '100%' 
    }]);
    setNewSubject('');
    setNewTarget('');
  };

  const deleteSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateProgress = (id, newProgress) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, progress: parseInt(newProgress) || 0 } : s));
  };

  return (
    <div className="glass p-6 rounded-3xl mb-8">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="w-8 h-8 text-indigo-400" />
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-400">
          Academic Arsenal
        </h2>
      </div>

      <form onSubmit={addSubject} className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="New Subject (e.g. OS, DSA)..."
          className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <input
          type="text"
          value={newTarget}
          onChange={(e) => setNewTarget(e.target.value)}
          placeholder="Target Grade / Milestone..."
          className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors md:max-w-xs"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> Add
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.length === 0 ? (
          <div className="col-span-full text-center py-8 text-slate-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No subjects added yet. Time to hit the books.</p>
          </div>
        ) : (
          subjects.map(subject => (
            <div key={subject.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 relative group overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-200">{subject.name}</h3>
                  <p className="text-xs text-indigo-400 font-medium tracking-wide uppercase mt-1">Target: {subject.target}</p>
                </div>
                <button onClick={() => deleteSubject(subject.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-400">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.min(100, Math.max(0, subject.progress))}%` }}
                  ></div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={subject.progress}
                  onChange={(e) => updateProgress(subject.id, e.target.value)}
                  className="w-full h-1 mt-2 accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
