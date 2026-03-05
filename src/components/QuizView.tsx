'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RefreshCcw, ShieldCheck, Sword, Sparkles, Brain, Trophy } from 'lucide-react';
import { MCQ } from '@/data/exercises';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface QuizViewProps {
  questions: MCQ[];
  onComplete: () => void;
}

export function QuizView({ questions, onComplete }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = questions[currentQuestionIndex];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
      onComplete();
    }
  };

  const resetQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in zoom-in-95 duration-500 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 -z-10 opacity-5 pointer-events-none">
        <Brain className="w-96 h-96" />
      </div>
      
      <div className="flex-1 overflow-y-auto p-12 max-w-4xl mx-auto w-full">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-2xl shadow-emerald-500/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase italic leading-none">THE LOGIC TRIAL</span>
            <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-widest leading-none">Prove your mastery of the code</p>
          </div>
        </motion.div>

        <div className="bg-card/50 backdrop-blur-sm p-12 rounded-[3rem] border border-border shadow-2xl shadow-black/20 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary shadow-inner">
             <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              className="h-full bg-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]"
            />
          </div>

          <div className="flex items-center justify-between mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground border border-border px-4 py-1.5 rounded-full bg-background/50">
              CHALLENGE {currentQuestionIndex + 1} OF {questions.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
            >
              <h2 className="text-4xl font-black text-foreground leading-[1.1] mb-12 tracking-tight italic">
                {question.question}
              </h2>

              <div className="grid grid-cols-1 gap-5">
                {question.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrectOption = idx === question.correctAnswer;
                  
                  return (
                    <motion.button
                      key={idx}
                      whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                      disabled={isAnswered}
                      onClick={() => handleSelect(idx)}
                      className={cn(
                        "w-full flex items-center gap-6 px-8 py-6 text-left font-black rounded-[1.75rem] border-2 transition-all shadow-sm active:scale-95 text-lg overflow-hidden relative group/btn",
                        !isAnswered && isSelected && "bg-primary/10 border-primary text-primary shadow-lg shadow-primary/20",
                        !isAnswered && !isSelected && "bg-background border-border text-muted-foreground hover:border-primary/30 hover:bg-secondary/50",
                        isAnswered && isCorrectOption && "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-lg shadow-emerald-500/20",
                        isAnswered && isSelected && !isCorrectOption && "bg-rose-500/10 border-rose-500 text-rose-500 opacity-80"
                      )}
                    >
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-300 shadow-inner border",
                        !isAnswered && isSelected && "bg-primary text-white border-primary rotate-12",
                        !isAnswered && !isSelected && "bg-secondary text-muted-foreground border-border group-hover/btn:rotate-6",
                        isAnswered && isCorrectOption && "bg-emerald-500 text-white border-emerald-500 animate-bounce",
                        isAnswered && isSelected && !isCorrectOption && "bg-rose-500 text-white border-rose-500 rotate-12"
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1 tracking-tight italic uppercase text-base">{option}</span>
                      {isAnswered && isCorrectOption && <Sparkles className="w-6 h-6 text-emerald-500" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                  "mt-12 p-8 rounded-[2rem] border-2 animate-in slide-in-from-top-4 duration-300 shadow-xl",
                  isCorrect ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-rose-500/10 border-rose-500/30 text-rose-500"
                )}
              >
                <div className="flex items-start gap-5">
                  <div className={cn(
                    "p-3 rounded-2xl shadow-lg shadow-black/10",
                    isCorrect ? "bg-emerald-500 text-white shadow-emerald-500/30" : "bg-rose-500 text-white shadow-rose-500/30"
                  )}>
                    {isCorrect ? <Trophy className="w-6 h-6" /> : <Sword className="w-6 h-6 rotate-180" />}
                  </div>
                  <div>
                    <p className="font-black text-xl italic uppercase tracking-tight mb-2 leading-none">{isCorrect ? 'SUCCESS!' : 'FAILED THE TRIAL'}</p>
                    <p className="text-sm font-bold leading-relaxed opacity-90 italic">&quot;{question.explanation}&quot;</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="p-8 border-t border-border bg-background/80 backdrop-blur-md flex justify-between items-center px-12 z-20 shadow-2xl transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border">
             <Brain className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-bold text-muted-foreground italic uppercase tracking-widest">Master the logic. Ascend the levels.</p>
        </div>
        
        <div className="flex gap-4">
          {!isAnswered ? (
            <button
              disabled={selectedOption === null}
              onClick={handleCheck}
              className="px-12 py-5 bg-primary text-white font-black rounded-[1.5rem] hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-primary/30 active:scale-95 text-lg uppercase tracking-widest border border-primary/20"
            >
              CONFIRM CHOICE
            </button>
          ) : (
            <>
              {!isCorrect && (
                <button
                  onClick={resetQuestion}
                  className="flex items-center gap-3 px-8 py-5 text-rose-500 font-black hover:bg-rose-500/10 rounded-[1.5rem] border-2 border-rose-500/30 transition-all active:scale-95 uppercase tracking-widest"
                >
                  <RefreshCcw className="w-6 h-6" />
                  TRY AGAIN
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!isCorrect}
                className="flex items-center gap-4 px-12 py-5 bg-primary text-white font-black rounded-[1.5rem] hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-primary/30 active:scale-95 text-lg uppercase tracking-widest relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {currentQuestionIndex < questions.length - 1 ? 'NEXT TRIAL' : 'START THE CRAFT'}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
