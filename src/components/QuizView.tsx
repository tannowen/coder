'use client';

import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RefreshCcw } from 'lucide-react';
import { MCQ } from '@/data/exercises';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex-1 overflow-y-auto p-10 max-w-3xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <HelpCircle className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] text-emerald-600 uppercase">Step 2: Check Your Knowledge</span>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="flex gap-1.5">
              {questions.map((_, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    idx === currentQuestionIndex ? "bg-indigo-600 w-6" : 
                    idx < currentQuestionIndex ? "bg-emerald-500" : "bg-slate-200"
                  )}
                />
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 leading-tight mb-10">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === question.correctAnswer;
              
              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-5 text-left font-bold rounded-2xl border-2 transition-all",
                    !isAnswered && isSelected && "bg-indigo-50 border-indigo-600 text-indigo-900 scale-[1.02]",
                    !isAnswered && !isSelected && "bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50",
                    isAnswered && isCorrectOption && "bg-emerald-50 border-emerald-500 text-emerald-900",
                    isAnswered && isSelected && !isCorrectOption && "bg-rose-50 border-rose-500 text-rose-900 opacity-80"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-colors",
                    !isAnswered && isSelected && "bg-indigo-600 text-white",
                    !isAnswered && !isSelected && "bg-slate-100 text-slate-400",
                    isAnswered && isCorrectOption && "bg-emerald-500 text-white",
                    isAnswered && isSelected && !isCorrectOption && "bg-rose-500 text-white"
                  )}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {isAnswered && isCorrectOption && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  {isAnswered && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-rose-500" />}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div className={cn(
              "mt-10 p-6 rounded-2xl border animate-in slide-in-from-top-4 duration-300",
              isCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"
            )}>
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-1.5 rounded-lg",
                  isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                )}>
                  {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-black mb-1">{isCorrect ? 'Correct!' : 'Incorrect Answer'}</p>
                  <p className="text-sm font-medium leading-relaxed opacity-90">{question.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
        {!isAnswered ? (
          <button
            disabled={selectedOption === null}
            onClick={handleCheck}
            className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-100"
          >
            Check Answer
          </button>
        ) : (
          <>
            {!isCorrect && (
              <button
                onClick={resetQuestion}
                className="flex items-center gap-2 px-6 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all"
              >
                <RefreshCcw className="w-5 h-5" />
                Try Again
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isCorrect}
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-100"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Proceed to Coding Practice'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
