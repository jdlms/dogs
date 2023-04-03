import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const ScoreContext = createContext<any>({});

export default function ScoreWrapper({ children }: any) {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const router = useRouter();

  return (
    <>
      <ScoreContext.Provider value={{ score, setScore, attempts, setAttempts }}>
        {children}
      </ScoreContext.Provider>
    </>
  );
}

export function useScoreContext() {
  return useContext(ScoreContext);
}
