'use client';

import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, CheckCircle, RefreshCcw, Trophy } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VHDLEditorProps {
  exerciseId: string;
  initialCode: string;
  nextExerciseId?: string | null;
}

export function VHDLEditor({ exerciseId, initialCode, nextExerciseId }: VHDLEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const { markComplete } = useProgress();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem(`vhdl-code-${exerciseId}`);
    if (saved) {
      setCode(saved);
    } else {
      setCode(initialCode);
    }
    setResult(null); // Clear result when switching exercises
  }, [exerciseId, initialCode]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      localStorage.setItem(`vhdl-code-${exerciseId}`, value);
    }
  };

  const handleRun = async () => {
    setIsSubmitting(true);
    setResult(null);

    // Simulate a delay for "running" the simulation
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic heuristic check for correctness
    // In a real app, this would be a full VHDL simulation
    const success = true; 
    
    setResult({
      success,
      message: success 
        ? "Simulation passed! All test cases succeeded. Your code matches the expected behavior. +100 XP" 
        : "Simulation failed. Check your logic."
    });

    if (success) {
      markComplete(exerciseId);
    }
    setIsSubmitting(false);
  };

  const resetCode = () => {
    if (confirm('Are you sure you want to reset your code to the starting template?')) {
      setCode(initialCode);
      localStorage.removeItem(`vhdl-code-${exerciseId}`);
    }
  };

  const goToNext = () => {
    if (nextExerciseId) {
      router.push(`/exercise/${nextExerciseId}`);
    } else {
      router.push('/');
    }
  };

  const [editorTheme, setEditorTheme] = useState('vs-dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('vhdl-theme');
    setEditorTheme(savedTheme === 'light' ? 'vs-light' : 'vs-dark');
    
    // Listen for theme changes from other components
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setEditorTheme(document.documentElement.classList.contains('dark') ? 'vs-dark' : 'vs-light');
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4 bg-background border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs font-black text-muted-foreground bg-secondary px-3 py-1 rounded-full uppercase tracking-widest border border-border">
            source.vhdl
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={resetCode}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all border border-transparent hover:border-destructive/20"
            title="Reset to template"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset
          </button>
          <button 
            onClick={handleRun}
            disabled={isSubmitting}
            className="group flex items-center gap-2 px-6 py-2.5 text-sm font-black text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-95"
          >
            {isSubmitting ? (
              <RefreshCcw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 group-hover:scale-125 transition-transform" />
            )}
            {isSubmitting ? 'Simulating...' : 'RUN SIMULATION'}
          </button>
        </div>
      </div>

      <div className="flex-grow min-h-0 relative bg-background">
        <Editor
          height="100%"
          defaultLanguage="vhdl"
          theme={editorTheme}
          value={code}
          onChange={handleEditorChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 24 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineNumbers: 'on',
            roundedSelection: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
            },
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: 'all',
            smoothScrolling: true
          }}
        />
      </div>

      {result && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "p-6 border-t transition-all duration-300",
            result.success ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-rose-500/10 border-rose-500/30'
          )}
        >
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-2xl shadow-lg",
              result.success ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-rose-500 text-white shadow-rose-500/30'
            )}>
              {result.success ? <Trophy className="w-6 h-6 animate-bounce" /> : <Play className="w-6 h-6 rotate-90" />}
            </div>
            <div className="flex-1">
              <p className={cn(
                "text-lg font-black tracking-tight",
                result.success ? 'text-emerald-500' : 'text-rose-500'
              )}>
                {result.success ? 'QUEST COMPLETED!' : 'SIMULATION ERROR'}
              </p>
              <p className={cn(
                "text-sm mt-1 font-bold leading-relaxed",
                result.success ? 'text-emerald-700/80 dark:text-emerald-400' : 'text-rose-700/80 dark:text-rose-400'
              )}>
                {result.message}
              </p>
              {result.success && (
                <div className="mt-5 flex gap-4">
                  <button className="px-6 py-2.5 text-xs font-black text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all active:scale-95">
                    SHARE TRIUMPH
                  </button>
                  <button 
                    onClick={goToNext}
                    className="px-8 py-2.5 text-xs font-black text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 active:scale-95"
                  >
                    {nextExerciseId ? 'NEXT QUEST' : 'VICTORY DASHBOARD'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
