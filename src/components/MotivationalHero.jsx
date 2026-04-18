import React, { useState, useEffect } from 'react';
import { Target, Zap, Clock } from 'lucide-react';

const quotes = [
  "Consistency. Discipline. Excellence.",
  "It's not a bug, it's an undocumented feature.",
  "Fix the cause, not the symptom.",
  "First, solve the problem. Then, write the code.",
  "Talk is cheap. Show me the code.",
  "Make it work, make it right, make it fast."
];

export default function MotivationalHero() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fade, setFade] = useState('opacity-100');

  useEffect(() => {
    const interval = setInterval(() => {
      setFade('opacity-0 -translate-y-2');
      
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFade('opacity-100 translate-y-0');
      }, 500); // 500ms fade out transition
      
    }, 5000); // changes every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl mb-8 group border border-slate-700/50 shadow-2xl shadow-blue-500/10">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm"></div>
        {/* Subtle grid pattern for hacker aesthetic */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 space-y-4 min-h-[140px] flex flex-col justify-center">
            {/* Animated Text Container */}
            <h1 className={`text-3xl md:text-5xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 tracking-tight transition-all duration-500 transform ${fade}`}>
              {quotes[currentQuoteIndex]}
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed border-l-2 border-cyan-500 pl-4">
              [SYSTEM] initializing workspace... The grind is hard, but the payout is exponential. Check your metrics below.
            </p>
          </div>

          <div className="flex-shrink-0 grid grid-cols-2 gap-4">
            <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[120px] transform transition-all hover:scale-105 hover:border-yellow-500/50">
              <Zap className="w-8 h-8 text-yellow-400 mb-2" />
              <span className="text-2xl font-bold text-white">12</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Day Streak</span>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[120px] transform transition-all hover:scale-105 hover:border-purple-500/50">
              <Target className="w-8 h-8 text-purple-400 mb-2" />
              <span className="text-2xl font-bold text-white">5 KPIs</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">On Track</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
