
import React from 'react';
import { UserProfile, Rank, Badge } from '../types';
import { RANKS, BADGES } from '../constants';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface UserProfileProps {
  profile: UserProfile;
  onBack: () => void;
}

const UserProfileView: React.FC<UserProfileProps> = ({ profile, onBack }) => {
  const currentRank = RANKS[profile.level] || RANKS[0];
  const nextRank = RANKS[profile.level + 1];
  
  // Calculate progress to next level
  let progress = 0;
  if (nextRank) {
    const xpInLevel = profile.xp - currentRank.minXp;
    const levelSpan = nextRank.minXp - currentRank.minXp;
    progress = Math.min(100, Math.max(0, (xpInLevel / levelSpan) * 100));
  } else {
    progress = 100; // Max level reached
  }

  // Format data for Recharts Radar
  const radarData = [
    { subject: 'Sintaxe', A: profile.stats.syntax, fullMark: 100 },
    { subject: 'Lógica', A: profile.stats.logic, fullMark: 100 },
    { subject: 'Layout', A: profile.stats.layout, fullMark: 100 },
    { subject: 'Semântica', A: profile.stats.semantic, fullMark: 100 },
    { subject: 'Debug', A: profile.stats.debug, fullMark: 100 },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 animate-[fadeIn_0.5s]">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <button 
            onClick={onBack}
            className="text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            ← VOLTAR
          </button>
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-cyber-cyan">PERFIL DO AGENTE</h1>
        </div>

        {/* Main Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Identity Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/20 blur-[50px] rounded-full"></div>
             
             <div className="flex items-center gap-4 z-10">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-cyber-cyan flex items-center justify-center text-4xl shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                  {currentRank.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{profile.nickname}</h2>
                  <p className="text-cyber-cyan font-mono text-sm">{currentRank.title}</p>
                </div>
             </div>

             <div className="z-10">
               <div className="flex justify-between text-xs text-gray-400 mb-1 font-mono">
                 <span>XP: {profile.xp}</span>
                 {nextRank ? <span>PRÓX: {nextRank.minXp} XP</span> : <span>MÁXIMO</span>}
               </div>
               <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5">
                 <div 
                   className="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple transition-all duration-500"
                   style={{ width: `${progress}%` }}
                 ></div>
               </div>
               <p className="text-xs text-gray-500 mt-2 italic">"{currentRank.subtitle}"</p>
             </div>
          </div>

          {/* Radar Chart */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-h-[300px]">
             <h3 className="text-sm font-mono text-gray-400 tracking-widest mb-2">MATRIZ DE COMPETÊNCIA</h3>
             <div className="w-full h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                   <PolarGrid stroke="#334155" />
                   <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                   <Radar
                     name="Skills"
                     dataKey="A"
                     stroke="#00f3ff"
                     strokeWidth={2}
                     fill="#00f3ff"
                     fillOpacity={0.3}
                   />
                 </RadarChart>
               </ResponsiveContainer>
             </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-2">CONQUISTAS E BADGES</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {BADGES.map((badge) => {
              const isUnlocked = profile.badges.includes(badge.id);
              return (
                <div 
                  key={badge.id}
                  className={`
                    group relative p-4 rounded-xl border flex flex-col items-center gap-2 text-center transition-all duration-300
                    ${isUnlocked 
                      ? 'bg-cyber-card border-cyber-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]' 
                      : 'bg-gray-900/50 border-white/5 opacity-50 grayscale'}
                  `}
                >
                  <div className={`text-3xl mb-1 transition-transform group-hover:scale-110 ${isUnlocked ? 'animate-pulse' : ''}`}>
                    {badge.icon}
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">{badge.name}</div>
                  
                  {/* Tooltip */}
                  <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black border border-gray-700 rounded text-[10px] text-gray-300 pointer-events-none transition-opacity z-20 shadow-xl">
                    <p className="font-bold text-white mb-1">{badge.description}</p>
                    <p className="font-mono text-cyber-cyan">{badge.conditionText}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfileView;
