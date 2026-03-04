'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { exercises } from '@/data/exercises';
import { CheckCircle, Circle, BookOpen } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Sidebar() {
  const pathname = usePathname();
  const { isComplete, initialized } = useProgress();

  const groupedExercises = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.category]) {
      acc[exercise.category] = [];
    }
    acc[exercise.category].push(exercise);
    return acc;
  }, {} as Record<string, typeof exercises>);

  return (
    <aside className="w-80 bg-white border-r border-slate-200 h-screen sticky top-0 overflow-y-auto flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">VHDL Learner</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="mb-8">
          <h3 className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Resources
          </h3>
          <Link
            href="/reference"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
              pathname === "/reference" 
                ? "bg-indigo-50 text-indigo-700 font-medium" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <BookOpen className="w-4.5 h-4.5 text-indigo-500" />
            <span>Language Reference</span>
          </Link>
        </div>

        {Object.entries(groupedExercises).map(([category, items]) => (
          <div key={category} className="mb-8 last:mb-0">
            <h3 className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                      isActive 
                        ? "bg-indigo-50 text-indigo-700 font-medium" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <div className={cn(
                      "flex-shrink-0 transition-colors duration-200",
                      done ? "text-emerald-500" : (isActive ? "text-indigo-500" : "text-slate-300 group-hover:text-slate-400")
                    )}>
                      {done ? (
                        <CheckCircle className="w-4.5 h-4.5" />
                      ) : (
                        <Circle className="w-4.5 h-4.5" />
                      )}
                    </div>
                    <span className="truncate">{exercise.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">
            Your Progress
          </p>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${initialized ? (exercises.filter(e => isComplete(e.id)).length / exercises.length) * 100 : 0}%` 
              }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            {initialized ? exercises.filter(e => isComplete(e.id)).length : 0} of {exercises.length} completed
          </p>
        </div>
      </div>
    </aside>
  );
}
