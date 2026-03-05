'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { exercises } from '@/data/exercises';
import { CheckCircle, Circle, BookOpen, Sun, Moon, Trophy, Zap, ChevronRight } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Sidebar() {
  const pathname = usePathname();
  const { isComplete, initialized, level, xpInLevel, xpNeeded, xp } = useProgress();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('vhdl-theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark'); // Default to dark
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('vhdl-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const groupedExercises = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.category]) {
      acc[exercise.category] = [];
    }
    acc[exercise.category].push(exercise);
    return acc;
  }, {} as Record<string, typeof exercises>);

  return (
    <aside className="w-80 bg-background border-r border-border h-screen sticky top-0 overflow-y-auto flex flex-col transition-colors duration-300">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-foreground tracking-tighter italic">VHDL QUEST</span>
        </Link>
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all border border-transparent hover:border-border"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Player Stats Card */}
      <div className="p-4">
        <div className="bg-secondary/50 rounded-2xl p-4 border border-border shadow-inner">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              {level}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                Level {level} Master
              </p>
              <div className="flex items-center justify-between text-xs font-bold text-foreground mb-1.5">
                <span>{xpInLevel} / {xpNeeded} XP</span>
                <span className="text-primary">{Math.round((xpInLevel / xpNeeded) * 100)}%</span>
              </div>
              <div className="h-2 w-full bg-border rounded-full overflow-hidden shadow-sm">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(xpInLevel / xpNeeded) * 100}%` }}
                  className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-background/50 rounded-xl p-2 border border-border flex flex-col items-center">
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Total XP</span>
              <span className="text-sm font-black text-foreground">{xp}</span>
            </div>
            <div className="bg-background/50 rounded-xl p-2 border border-border flex flex-col items-center">
              <span className="text-[9px] font-bold text-muted-foreground uppercase">Badges</span>
              <span className="text-sm font-black text-foreground">{Math.floor(xp/300)}</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-6">
          <Link
            href="/reference"
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 group",
              pathname === "/reference" 
                ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent hover:border-border"
            )}
          >
            <div className="flex items-center gap-3">
              <BookOpen className={cn("w-5 h-5", pathname === "/reference" ? "text-white" : "text-primary")} />
              <span>Grimoire Reference</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {Object.entries(groupedExercises).map(([category, items]) => (
          <div key={category} className="mb-8 last:mb-0">
            <h3 className="px-4 mb-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              {category}
            </h3>
            <div className="space-y-1">
              {items.map((exercise) => {
                const isActive = pathname === `/exercise/${exercise.id}`;
                const done = initialized && isComplete(exercise.id);
                
                return (
                  <Link
                    key={exercise.id}
                    href={`/exercise/${exercise.id}`}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 group border",
                      isActive 
                        ? "bg-primary/10 border-primary text-primary font-bold shadow-sm" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground border-transparent hover:border-border"
                    )}
                  >
                    <div className={cn(
                      "flex-shrink-0 transition-transform duration-300",
                      done ? "text-emerald-500" : (isActive ? "text-primary" : "text-border group-hover:text-muted-foreground"),
                      isActive && !done && "animate-pulse"
                    )}>
                      {done ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </div>
                    <span className="truncate flex-1">{exercise.title}</span>
                    {isActive && <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
