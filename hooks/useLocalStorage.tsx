import { useEffect, useState } from "react";

export const useLocalStorage = (storageKey: string, fallbackState: { playerScore: number }) => {
  console.log(storageKey, fallbackState);
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey)!) ?? fallbackState
  );

  useEffect(() => {
    !!window ? localStorage.setItem(storageKey, JSON.stringify(value)) : null;
  }, [value, storageKey]);

  return [value, setValue];
};


//https://upmostly.com/next-js/using-localstorage-in-next-js

 // track player guesses - 5 guesses means come back tomorrow
 // track current time and amount of time until 12am at user location, store in local storage
 // if player guesses dog correctly, add to collection, store in local storage

 // https://www.robinwieruch.de/local-storage-react/