import { useState, useEffect } from 'react';

/**
 * Custom hook to animate a number from 0 to target
 * @param {number} target - The final value to reach
 * @param {number} duration - Animation duration in ms
 * @param {boolean} trigger - Whether to start the animation
 */
export const useCounter = (target, duration = 1000, trigger = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = parseInt(target);
    if (start === end) {
      setCount(end);
      return;
    }

    let totalMiliseconds = duration;
    let incrementTime = (totalMiliseconds / end) > 10 ? (totalMiliseconds / end) : 10;
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    // If increments are too fast (high target), use requestAnimationFrame approach conceptually
    // but for small numbers in this request, setInterval is easier to manage.
    // For values like 30, it's fine.

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
};
