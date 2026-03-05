'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { exercises } from '@/data/exercises';
import { useProgress } from '@/hooks/useProgress';
import { CheckCircle, Circle, BookOpen, Rocket, Terminal, Code2, ArrowRight, Zap, Target, BookOpenCheck, HelpCircle, Trophy, Star, Sword, Shield, Crown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HomePage() {
  const { isComplete, initialized, level, xp, completedExercises } = useProgress();

  const totalExercises = exercises.length;
  const completedCount = completedExercises.length;
  const progressPercent = Math.round((completedCount / totalExercises) * 100);

  return (
    <div className="flex h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background/50">
        <div className="max-w-6xl mx-auto px-10 py-16">
          
          {/* Hero Section */}
          <header className="mb-16 relative">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px] -z-10" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-3 bg-primary rounded-2xl shadow-xl shadow-primary/30 rotate-3 group-hover:rotate-0 transition-transform">
                <Sword className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-black tracking-[0.3em] text-primary uppercase italic">VHDL ADVENTURE</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl font-black text-foreground tracking-tighter leading-[1] mb-8"
            >
              Master the <span className="text-primary italic">Silicon</span> Grimoire.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12 font-medium"
            >
              The ultimate quest to conquer VHDL and FPGA design. Level up your skills, unlock badges, and become a legendary hardware architect.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-6"
            >
              <Link 
                href={`/exercise/${exercises[0].id}`}
                className="group relative flex items-center gap-4 px-10 py-5 bg-primary text-white font-black rounded-2xl transition-all hover:-translate-y-1 active:scale-95 shadow-2xl shadow-primary/40 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <Rocket className="w-6 h-6" />
                START YOUR QUEST
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-10 py-5 text-foreground font-black rounded-2xl hover:bg-secondary border-2 border-border transition-all active:scale-95">
                VIEW MAP
              </button>
            </motion.div>
          </header>

          {/* Achievement Progress */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
            {[
              { label: 'Player Level', value: level, icon: <Crown className="text-amber-500" />, bg: 'bg-amber-500/10' },
              { label: 'Total XP', value: xp, icon: <Zap className="text-primary" />, bg: 'bg-primary/10' },
              { label: 'Quests Won', value: completedCount, icon: <Trophy className="text-emerald-500" />, bg: 'bg-emerald-500/10' },
              { label: 'World Progress', value: `${progressPercent}%`, icon: <Star className="text-purple-500" />, bg: 'bg-purple-500/10' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="p-6 bg-card rounded-3xl border border-border flex items-center gap-5 shadow-sm"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner", stat.bg)}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-foreground tracking-tight">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Journey Section */}
          <section className="mb-24">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-2xl text-primary border border-border">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-foreground tracking-tight">Active Quests</h2>
                  <p className="text-sm font-bold text-muted-foreground italic">Choose your next challenge</p>
                </div>
              </div>
              <div className="flex bg-secondary p-1 rounded-xl border border-border">
                {['All', 'Basics', 'Sequential', 'Logic'].map((tab) => (
                  <button key={tab} className={cn(
                    "px-4 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all",
                    tab === 'All' ? "bg-background text-primary shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"
                  )}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exercises.map((exercise, i) => {
                const done = initialized && isComplete(exercise.id);
                return (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (i * 0.05) }}
                  >
                    <Link 
                      href={`/exercise/${exercise.id}`}
                      className={cn(
                        "group relative bg-card rounded-[2.5rem] border-2 p-8 transition-all flex flex-col hover:-translate-y-3 duration-500 h-full overflow-hidden",
                        done ? "border-emerald-500/30 hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.2)]" : "border-border hover:border-primary/30 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.2)]"
                      )}
                    >
                      {done && (
                        <div className="absolute top-0 right-0 p-6">
                          <div className="bg-emerald-500 text-white p-1.5 rounded-full shadow-lg shadow-emerald-500/50">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-8">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-inner",
                          exercise.difficulty === 'Beginner' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                          exercise.difficulty === 'Intermediate' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                          "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        )}>
                          {exercise.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors leading-tight tracking-tight">
                        {exercise.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed mb-10 font-medium flex-grow italic">
                        &quot;{exercise.category}: Master the mystical arts of hardware logic through this specific quest.&quot;
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center text-primary border border-border">
                            <Code2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">XP Reward</p>
                            <p className="text-sm font-black text-foreground leading-none">100 XP</p>
                          </div>
                        </div>
                        <span className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
