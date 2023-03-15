import { DifficultyProps } from "@/interfaces/difficultyProps";

export function HardMode({ setDifficultyNum, setGuess, guess }: DifficultyProps) {
  const hardModeOn = () => {
    setDifficultyNum(15);
    setGuess(!guess);
  };

  return (
    <div>
      <button onClick={() => hardModeOn()}>Hard Mode</button>
    </div>
  );
}
