import { Dispatch, SetStateAction } from "react";

interface BackButtonProps {
  setDisplayName: Dispatch<SetStateAction<boolean>>;
  setDisplayPhoto: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<number>>;
  setAttempts: Dispatch<SetStateAction<number>>;
}

export function Back({ setDisplayName, setDisplayPhoto, setScore, setAttempts }: BackButtonProps) {
  const handleClick = () => {
    setDisplayName(false);
    setDisplayPhoto(false);
    setAttempts(0);
    setScore(0);
  };

  return (
    <>
      <span style={{ fontSize: "2rem", cursor: "pointer" }} onClick={handleClick}>
        ⬅
      </span>
    </>
  );
}
