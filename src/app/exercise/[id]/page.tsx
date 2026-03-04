'use client';

import React, { use } from 'react';
import { exercises } from '@/data/exercises';
import { Sidebar } from '@/components/Sidebar';
import { VHDLEditor } from '@/components/VHDLEditor';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProgress } from '@/hooks/useProgress';
import { ChevronLeft, ChevronRight, CheckCircle2, Trophy, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const exercise = exercises.find((e) => e.id === id);
  const { isComplete, initialized } = useProgress();

  if (!exercise) {
    notFound();
  }

  const done = initialized && isComplete(exercise.id);
  const exerciseIndex = exercises.findIndex(e => e.id === id);
  const prevExercise = exerciseIndex > 0 ? exercises[exerciseIndex - 1] : null;
  const nextExercise = exerciseIndex < exercises.length - 1 ? exercises[exerciseIndex + 1] : null;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors border border-transparent hover:border-slate-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">{exercise.title}</h1>
                {done && (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[11px] font-bold uppercase tracking-wider rounded-full border border-emerald-100 animate-in zoom-in-95 duration-500">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Completed
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  {exercise.category}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 border-l border-slate-200 pl-4">
                  <Clock className="w-3.5 h-3.5" />
                  {exercise.difficulty === 'Beginner' ? '10 min' : exercise.difficulty === 'Intermediate' ? '25 min' : '45 min'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {prevExercise && (
              <Link 
                href={`/exercise/${prevExercise.id}`}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all border border-slate-100"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            )}
            {nextExercise && (
              <Link 
                href={`/exercise/${nextExercise.id}`}
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm shadow-indigo-100"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </header>

        <div className="flex-grow flex min-h-0">
          <div className="w-1/3 min-w-[400px] flex flex-col border-r border-slate-100 overflow-y-auto">
            <div className="p-8">
              <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-h3:text-indigo-600 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:rounded-xl prose-pre:p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {exercise.description}
                </ReactMarkdown>
              </div>
              
              <div className="mt-12 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-indigo-900">Expert Tip</h4>
                </div>
                <p className="text-sm text-indigo-800/80 leading-relaxed italic">
                  Always check your syntax before running. In VHDL, the order of port declarations and assignments matters!
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 p-6 bg-slate-50 flex flex-col min-h-0">
            <VHDLEditor 
              exerciseId={exercise.id} 
              initialCode={exercise.initialCode} 
              nextExerciseId={nextExercise?.id}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
