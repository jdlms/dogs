import { DifficultyProps } from "@/interfaces/difficultyProps";

export function HardMode({ setDifficultyNum, setGuess, guess }: DifficultyProps) {
  const hardModeOn = () => {
    setDifficultyNum(15);
    setGuess(!guess);
  };

  return (
    <div style={{ alignSelf: "flex-end", flexGrow: 1 }}>
      <button onClick={() => hardModeOn()}>Hard Mode</button>
    </div>
  );
}
