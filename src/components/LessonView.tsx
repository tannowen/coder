'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BookOpen, ArrowRight, Sword, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface LessonViewProps {
  content: string;
  onContinue: () => void;
}

export function LessonView({ content, onContinue }: LessonViewProps) {
  return (
    <div className="flex flex-col h-full bg-background animate-in fade-in duration-500 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-12 -z-10 opacity-5 pointer-events-none">
        <BookOpen className="w-96 h-96" />
      </div>
      
      <div className="flex-1 overflow-y-auto p-12 max-w-5xl mx-auto w-full">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="p-3 bg-primary rounded-2xl text-white shadow-2xl shadow-primary/40">
            <Sword className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black tracking-[0.3em] text-primary uppercase italic leading-none">THE SILICON LORE</span>
            <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-widest leading-none">Master the concept to continue</p>
          </div>
        </motion.div>

        <div className="prose prose-invert prose-2xl max-w-none prose-headings:font-black prose-h1:text-7xl prose-h1:tracking-tighter prose-h1:italic prose-h1:mb-12 prose-h3:text-primary prose-h3:tracking-tight prose-code:text-primary prose-code:bg-primary/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none prose-pre:bg-secondary/50 prose-pre:rounded-[2rem] prose-pre:p-10 prose-pre:shadow-inner prose-pre:border prose-pre:border-border">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
        
        <div className="h-24" />
      </div>

      <div className="p-8 border-t border-border bg-background/80 backdrop-blur-md flex justify-between items-center px-12 z-20 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center border border-border">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-bold text-muted-foreground italic">Read carefully. Knowledge is your strongest shield.</p>
        </div>
        <button
          onClick={onContinue}
          className="group flex items-center gap-4 px-12 py-5 bg-primary text-white font-black rounded-[1.5rem] hover:bg-primary/90 transition-all hover:-translate-y-1 shadow-2xl shadow-primary/30 active:scale-95 text-lg overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          CONTINUE TO THE TRIAL
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </div>
  );
}
