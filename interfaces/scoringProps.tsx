import { Dispatch, SetStateAction } from "react";

export interface ScoringProps {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  attempts: number;
  setAttempts: Dispatch<SetStateAction<number>>;
}
