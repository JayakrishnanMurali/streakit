import { type Streak } from "@/types/streak.types";

export const openDB = (
  dbName: string,
  version: number,
): Promise<IDBDatabase> => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, version);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("streaks")) {
        db.createObjectStore("streaks", { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const getStreakData = async (db: IDBDatabase): Promise<Streak> => {
  return new Promise<Streak>((resolve, reject) => {
    const transaction = db.transaction(["streaks"], "readonly");
    const store = transaction.objectStore("streaks");
    const request = store.get("user-streak");

    request.onsuccess = () => {
      const result = request.result as Streak | undefined;
      resolve(result ?? { currentStreak: 0, maxStreak: 0, lastUpdated: 0 });
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const saveStreakData = async (
  db: IDBDatabase,
  streak: Streak,
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(["streaks"], "readwrite");
    const store = transaction.objectStore("streaks");
    const request = store.put({ id: "user-streak", ...streak });

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};
