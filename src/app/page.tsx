'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { exercises } from '@/data/exercises';
import { useProgress } from '@/hooks/useProgress';
import { CheckCircle, Circle, BookOpen, Rocket, Terminal, Code2, ArrowRight, Zap, Target, BookOpenCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HomePage() {
  const { isComplete, initialized } = useProgress();

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-6xl mx-auto px-10 py-16">
          <header className="mb-16">
            <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
              <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-bold tracking-[0.2em] text-indigo-600 uppercase">Master VHDL Fast</span>
            </div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 animate-in fade-in slide-in-from-left-6 duration-1000">
              Learn VHDL by <span className="text-indigo-600">doing.</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed mb-10 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
              Interactive exercises, instant feedback, and real-time simulations to help you master hardware description languages for FPGAs.
            </p>
            <div className="flex items-center gap-5 animate-in fade-in slide-in-from-left-10 duration-1000 delay-300">
              <Link 
                href={`/exercise/${exercises[0].id}`}
                className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all hover:-translate-y-1 shadow-xl shadow-indigo-100"
              >
                Start Learning Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 border border-slate-100 transition-all">
                Browse Exercises
              </button>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-100 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">1. Learn</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Simple, jargon-free lessons that break down complex VHDL concepts into easy-to-digest pieces.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-emerald-100 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">2. Check</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Interactive multiple-choice questions to reinforce what you've learned before writing any code.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-amber-100 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">3. Practice</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Write actual VHDL code in our built-in IDE with real-time feedback and progress tracking.</p>
            </div>
          </section>

          <section className="mb-24">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                  <BookOpenCheck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Recommended for You</h2>
              </div>
              <Link href="/exercises" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View All Exercises
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => {
                const done = initialized && isComplete(exercise.id);
                return (
                  <Link 
                    key={exercise.id}
                    href={`/exercise/${exercise.id}`}
                    className="group bg-white rounded-3xl border border-slate-100 p-8 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all flex flex-col hover:-translate-y-2 duration-300"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em]",
                        exercise.difficulty === 'Beginner' ? "bg-emerald-50 text-emerald-600" :
                        exercise.difficulty === 'Intermediate' ? "bg-amber-50 text-amber-600" :
                        "bg-rose-50 text-rose-600"
                      )}>
                        {exercise.difficulty}
                      </span>
                      {done && (
                        <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs">
                          <CheckCircle className="w-4 h-4" />
                          Done
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {exercise.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">
                      Master the fundamentals of {exercise.category.toLowerCase()} logic in VHDL.
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                        <Code2 className="w-4 h-4" />
                        VHDL
                      </div>
                      <span className="p-2 bg-slate-50 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
