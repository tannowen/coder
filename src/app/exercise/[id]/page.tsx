'use client';

import React, { use, useState, useEffect } from 'react';
import { exercises } from '@/data/exercises';
import { Sidebar } from '@/components/Sidebar';
import { VHDLEditor } from '@/components/VHDLEditor';
import { LessonView } from '@/components/LessonView';
import { QuizView } from '@/components/QuizView';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProgress } from '@/hooks/useProgress';
import { ChevronLeft, ChevronRight, CheckCircle2, Trophy, Clock, BookOpen, HelpCircle, Code2, Sparkles, Sword, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Step = 'learn' | 'quiz' | 'practice';

export default function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const exercise = exercises.find((e) => e.id === id);
  const { isComplete, initialized, level } = useProgress();
  const [currentStep, setCurrentStep] = useState<Step>('learn');

  useEffect(() => {
    // Reset to 'learn' when changing exercise
    setCurrentStep('learn');
  }, [id]);

  if (!exercise) {
    notFound();
  }

  const done = initialized && isComplete(exercise.id);
  const exerciseIndex = exercises.findIndex(e => e.id === id);
  const prevExercise = exerciseIndex > 0 ? exercises[exerciseIndex - 1] : null;
  const nextExercise = exerciseIndex < exercises.length - 1 ? exercises[exerciseIndex + 1] : null;

  const steps = [
    { id: 'learn', label: 'THE LORE', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'quiz', label: 'THE TRIAL', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'practice', label: 'THE CRAFT', icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans antialiased text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 bg-background/50">
        <header className="flex items-center justify-between px-8 py-6 bg-background/80 backdrop-blur-md border-b border-border z-20 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="p-3 bg-secondary rounded-2xl text-muted-foreground hover:text-foreground transition-all border border-border shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </Link>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-black text-foreground tracking-tight leading-none italic">{exercise.title}</h1>
                  {done && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      MASTERED
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {exercise.category}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground border-l border-border pl-4 uppercase tracking-widest">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    100 XP REWARD
                  </div>
                </div>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="flex bg-secondary p-1.5 rounded-[1.25rem] border border-border shadow-inner">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id as Step)}
                  className={cn(
                    "relative flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all active:scale-95",
                    currentStep === step.id 
                      ? "bg-background text-primary shadow-lg shadow-primary/10 border border-border" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {step.icon}
                  {step.label}
                  {currentStep === step.id && (
                    <motion.div 
                      layoutId="step-glow"
                      className="absolute inset-0 bg-primary/5 rounded-xl blur-lg -z-10"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {prevExercise && (
              <Link 
                href={`/exercise/${prevExercise.id}`}
                className="flex items-center gap-3 px-6 py-3 text-xs font-black text-muted-foreground hover:text-foreground bg-secondary rounded-2xl transition-all border border-border shadow-sm active:scale-95 uppercase tracking-widest"
              >
                <ChevronLeft className="w-4 h-4" />
                BACK
              </Link>
            )}
            {nextExercise && (
              <Link 
                href={`/exercise/${nextExercise.id}`}
                className="flex items-center gap-3 px-8 py-3 text-xs font-black text-white bg-primary hover:bg-primary/90 rounded-2xl transition-all shadow-xl shadow-primary/25 active:scale-95 uppercase tracking-widest"
              >
                NEXT QUEST
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </header>

        <div className="flex-grow flex min-h-0 relative">
          <AnimatePresence mode="wait">
            {currentStep === 'learn' && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full h-full"
              >
                <LessonView 
                  content={exercise.lesson} 
                  onContinue={() => setCurrentStep('quiz')} 
                />
              </motion.div>
            )}

            {currentStep === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full h-full"
              >
                <QuizView 
                  questions={exercise.quiz} 
                  onComplete={() => setCurrentStep('practice')} 
                />
              </motion.div>
            )}

            {currentStep === 'practice' && (
              <motion.div
                key="practice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex min-h-0 w-full"
              >
                <div className="w-[40%] min-w-[500px] flex flex-col border-r border-border overflow-y-auto bg-background/50">
                  <div className="p-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-primary rounded-2xl text-white shadow-xl shadow-primary/30">
                        <Sword className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-foreground tracking-tight leading-none italic uppercase">THE OBJECTIVE</h3>
                        <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-widest">Complete the logic to level up</p>
                      </div>
                    </div>
                    <div className="prose prose-invert prose-lg max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {exercise.description}
                      </ReactMarkdown>
                    </div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="mt-16 p-8 bg-secondary/50 rounded-[2rem] border border-border relative overflow-hidden group shadow-inner"
                    >
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Trophy className="w-16 h-16" />
                      </div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-2.5 bg-primary/20 rounded-xl text-primary border border-primary/20 shadow-inner">
                          <Crown className="w-6 h-6" />
                        </div>
                        <h4 className="font-black text-foreground uppercase tracking-widest text-sm">Grandmaster&apos;s Tip</h4>
                      </div>
                      <p className="text-sm font-bold text-muted-foreground leading-relaxed italic">
                        &quot;Master the syntax as a knight masters his sword. Precision in your port declarations is the difference between a working chip and silent silicon.&quot;
                      </p>
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex-1 p-8 bg-background flex flex-col min-h-0 relative">
                  <div className="absolute inset-0 bg-primary/5 -z-10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2 scale-75 opacity-50" />
                  <VHDLEditor 
                    exerciseId={exercise.id} 
                    initialCode={exercise.initialCode} 
                    nextExerciseId={nextExercise?.id}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
