import { Dispatch, SetStateAction } from "react";

export interface DifficultyProps {
  setDifficultyNum: Dispatch<SetStateAction<number>>;
  setGuess: Dispatch<SetStateAction<boolean>>;
  guess: boolean;
}
