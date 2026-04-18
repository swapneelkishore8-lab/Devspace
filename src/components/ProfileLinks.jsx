import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SiLeetcode, SiCodeforces, SiCodechef, SiHackerrank, SiGeeksforgeeks, SiGmail } from 'react-icons/si';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ProfileLinks() {
  const profiles = [
    {
      name: 'GitHub',
      icon: <FaGithub className="w-6 h-6" />,
      url: 'https://github.com/',
      color: 'hover:border-slate-400 hover:shadow-[0_0_15px_rgba(148,163,184,0.3)]',
      gradient: 'from-slate-700 to-slate-900',
      tag: 'Repositories'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin className="w-6 h-6" />,
      url: 'https://linkedin.com/',
      color: 'hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]',
      gradient: 'from-blue-600 to-blue-900',
      tag: 'Network'
    },
    {
      name: 'LeetCode',
      icon: <SiLeetcode className="w-6 h-6" />,
      url: 'https://leetcode.com/',
      color: 'hover:border-yellow-500 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]',
      gradient: 'from-yellow-500 to-orange-700',
      tag: 'Problem Solving'
    },
    {
      name: 'Codeforces',
      icon: <SiCodeforces className="w-6 h-6" />,
      url: 'https://codeforces.com/',
      color: 'hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]',
      gradient: 'from-red-500 to-red-900',
      tag: 'Competitive'
    },
    {
      name: 'CodeChef',
      icon: <SiCodechef className="w-6 h-6" />,
      url: 'https://codechef.com/',
      color: 'hover:border-amber-700 hover:shadow-[0_0_15px_rgba(180,83,9,0.3)]',
      gradient: 'from-amber-600 to-amber-900',
      tag: 'Contests'
    },
    {
      name: 'HackerRank',
      icon: <SiHackerrank className="w-6 h-6" />,
      url: 'https://hackerrank.com/',
      color: 'hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]',
      gradient: 'from-green-600 to-green-900',
      tag: 'Challenges'
    },
    {
      name: 'GeeksforGeeks',
      icon: <SiGeeksforgeeks className="w-6 h-6" />,
      url: 'https://geeksforgeeks.org/',
      color: 'hover:border-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]',
      gradient: 'from-green-500 to-emerald-900',
      tag: 'Fundamentals'
    },
    {
      name: 'Gmail',
      icon: <SiGmail className="w-6 h-6" />,
      url: 'mailto:developer@gmail.com',
      color: 'hover:border-red-400 hover:shadow-[0_0_15px_rgba(248,113,113,0.3)]',
      gradient: 'from-red-600 to-red-900',
      tag: 'Contact'
    }
  ];

  return (
    <div className="glass p-6 rounded-3xl mb-8 border border-slate-700/50 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <ExternalLink className="w-8 h-8 text-cyan-400" />
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
          Professional Presence
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {profiles.map((profile, idx) => (
          <a
            key={idx}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-2 ${profile.color}`}
          >
            {/* Background Gradient Hover Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${profile.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
            
            <div className="text-slate-300 group-hover:text-white group-hover:scale-110 transition-all z-10 flex items-center justify-center w-8 h-8">
              {profile.icon}
            </div>
            
            <div className="text-center z-10 w-full">
              <h3 className="font-bold text-sm text-slate-200">{profile.name}</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1 truncate">{profile.tag}</p>
            </div>
            
            {/* Corner Link Icon */}
            <ExternalLink className="w-3 h-3 absolute top-3 right-3 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
}
