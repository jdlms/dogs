import { useLocalStorage } from "@/hooks/useLocalStorage";
import { player } from "@/lib/player";

import { NoScoreYet } from "./NoScoreYet";
import { Span } from "./Score";

export function LandingScoring() {
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);

  return (
    <>
      {playerData.lifetimePlayerGuesses === 0 ? (
        <NoScoreYet />
      ) : (
        <div
          style={{
            paddingBottom: "10px",
          
            fontSize: "1.5rem",
            width: "100%",
          }}
        >
          You&apos;ve made a total of <Span>{playerData.lifetimePlayerGuesses}</Span> guesses and
          collected <Span>{playerData.correctBreedIds.length}</Span> breeds.
        </div>
      )}
    </>
  );
}

// Your current lifetime score is <Span>{playerData.lifetimePlayerScore}</Span>.
