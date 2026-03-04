import { useState, useEffect } from 'react';

export function useProgress() {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('vhdl-progress');
    if (saved) {
      try {
        setCompletedExercises(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('vhdl-progress', JSON.stringify(completedExercises));
    }
  }, [completedExercises, initialized]);

  const markComplete = (id: string) => {
    if (!completedExercises.includes(id)) {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  const isComplete = (id: string) => completedExercises.includes(id);

  return { completedExercises, markComplete, isComplete, initialized };
}
