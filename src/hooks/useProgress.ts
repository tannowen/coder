import { useState, useEffect } from 'react';

export function useProgress() {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('vhdl-progress');
    const savedXp = localStorage.getItem('vhdl-xp');
    if (saved) {
      try {
        setCompletedExercises(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
    if (savedXp) {
      setXp(parseInt(savedXp, 10) || 0);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('vhdl-progress', JSON.stringify(completedExercises));
      localStorage.setItem('vhdl-xp', xp.toString());
    }
  }, [completedExercises, xp, initialized]);

  const markComplete = (id: string) => {
    if (!completedExercises.includes(id)) {
      setCompletedExercises([...completedExercises, id]);
      setXp(prev => prev + 100); // 100 XP per exercise
    }
  };

  const isComplete = (id: string) => completedExercises.includes(id);

  const level = Math.floor(xp / 500) + 1;
  const xpInLevel = xp % 500;
  const xpNeeded = 500;

  return { completedExercises, markComplete, isComplete, initialized, xp, level, xpInLevel, xpNeeded };
}
