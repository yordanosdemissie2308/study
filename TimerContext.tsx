import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface TimerContextType {
  timeSpent: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  isActive: boolean;
  getTotalTimeForWeek: () => number;
}

export const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [weeklyTime, setWeeklyTime] = useState<Record<string, number>>({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, intervalId]);

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
    addTimeToDay();
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeSpent(0);
  };

  const addTimeToDay = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    setWeeklyTime((prev) => {
      const updatedTime = { ...prev, [today]: prev[today] + timeSpent };
      return updatedTime;
    });
    setTimeSpent(0);
  };

  const getTotalTimeForWeek = () => {
    return Object.values(weeklyTime).reduce((total, dayTime) => total + dayTime, 0);
  };

  return (
    <TimerContext.Provider
      value={{ timeSpent, startTimer, pauseTimer, resetTimer, isActive, getTotalTimeForWeek }}
    >
      {children}
    </TimerContext.Provider>
  );
};
