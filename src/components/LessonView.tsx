'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, ArrowRight } from 'lucide-react';

interface LessonViewProps {
  content: string;
  onContinue: () => void;
}

export function LessonView({ content, onContinue }: LessonViewProps) {
  return (
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500">
      <div className="flex-1 overflow-y-auto p-10 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] text-indigo-600 uppercase">Step 1: Learn</span>
        </div>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-8 prose-h3:text-indigo-600 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:shadow-xl prose-pre:shadow-slate-200/50">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
        <button
          onClick={onContinue}
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all hover:-translate-y-1 shadow-xl shadow-indigo-100"
        >
          I've Learned This, Continue to Quiz
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
