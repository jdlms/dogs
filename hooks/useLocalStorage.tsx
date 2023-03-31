import { useEffect, useState } from "react";

export const useLocalStorage = (
  storageKey: string,
  fallbackState: {
    lifetimePlayerGuesses: number;
    lifetimePlayerScore: number;
    correctBreedIds: string[];
    dayOfTheWeek: string;
    byNameAttempts: number;
    byPhotoAttempts: number;
  }
) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : fallbackState;
    }
    return fallbackState;
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    }
  }, [value, storageKey]);

  return [value, setValue] as const;
};

// track player guesses - 5 guesses means come back tomorrow
// track current time and amount of time until 12am at user location, store in local storage
// if player guesses dog correctly, add to collection, store in local storage
