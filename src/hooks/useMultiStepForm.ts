import { useState } from 'react';

export const useMultiStepForm = (components: React.ReactNode[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      return;
    }
  };

  const next = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }
  };

  return {
    currentForm: components[currentIndex],
    next,
    prev,
    currentIndex,
    isFirstIndex: currentIndex > 0,
    isLastIndex: currentIndex === components.length - 1,
  };
};
