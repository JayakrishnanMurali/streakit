import { getStreakData, openDB, saveStreakData } from "@/lib/indexdb";
import { type Streak } from "@/types/streak.types";
import { useEffect, useState, useCallback } from "react";

export const useStreak = () => {
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [nextStreakDate, setNextStreakDate] = useState<Date | null>(null);
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initDB = async () => {
      try {
        setLoading(true);
        const database = await openDB("StreakDB", 1);
        setDb(database);
        const streak = await getStreakData(database);
        setCurrentStreak(streak.currentStreak);
        setMaxStreak(streak.maxStreak);
        calculateNextStreakDate(streak.lastUpdated);
      } catch (error) {
        console.error("Failed to initialize IndexedDB", error);
      } finally {
        setLoading(false);
      }
    };

    void initDB();
  }, []);

  const calculateNextStreakDate = (lastUpdated: number) => {
    const lastUpdatedDate = new Date(lastUpdated);
    lastUpdatedDate.setDate(lastUpdatedDate.getDate() + 1); // Next day after last streak
    setNextStreakDate(lastUpdatedDate);
  };

  const resetStreak = useCallback(async () => {
    if (db) {
      setLoading(true);
      try {
        const newStreak: Streak = {
          currentStreak: 0,
          maxStreak: maxStreak,
          lastUpdated: Date.now(),
        };
        await saveStreakData(db, newStreak);
        setCurrentStreak(0);
        calculateNextStreakDate(newStreak.lastUpdated);
      } catch (error) {
        console.error("Failed to reset streak", error);
      } finally {
        setLoading(false);
      }
    }
  }, [db, maxStreak]);

  const addStreak = useCallback(async () => {
    if (db) {
      setLoading(true);
      try {
        const streak = await getStreakData(db);
        const currentDate = new Date().setHours(0, 0, 0, 0);
        const lastUpdatedDate = new Date(streak.lastUpdated).setHours(
          0,
          0,
          0,
          0,
        );

        if (currentDate === lastUpdatedDate) {
          return;
        }

        const dayDifference =
          (currentDate - lastUpdatedDate) / (1000 * 60 * 60 * 24);
        if (dayDifference > 1) {
          streak.currentStreak = 1;
        } else {
          streak.currentStreak += 1;
        }

        if (streak.currentStreak > streak.maxStreak) {
          streak.maxStreak = streak.currentStreak;
        }

        streak.lastUpdated = Date.now();
        await saveStreakData(db, streak);

        setCurrentStreak(streak.currentStreak);
        setMaxStreak(streak.maxStreak);
        calculateNextStreakDate(streak.lastUpdated);
      } catch (error) {
        console.error("Failed to add streak", error);
      } finally {
        setLoading(false);
      }
    }
  }, [db]);

  return {
    currentStreak,
    maxStreak,
    nextStreakDate,
    resetStreak,
    addStreak,
    isLoading: loading,
  };
};
