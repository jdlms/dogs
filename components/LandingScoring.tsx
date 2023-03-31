import { useLocalStorage } from "@/hooks/useLocalStorage";
import { player } from "@/pages/name";
import { NoScoreYet } from "./NoScoreYet";
import { Span } from "./Score";

export function LandingScoring() {
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);
  console.log(playerData);
  return (
    <>
      {playerData.lifetimePlayerGuesses === 0 ? (
        <NoScoreYet />
      ) : (
        <div style={{ paddingBottom: "10px", borderBottom: "solid 1px white" }}>
          You&apos;ve made a total of <Span>{playerData.lifetimePlayerGuesses}</Span> guesses and
          collected <Span>{playerData.correctBreedIds.length}</Span> breeds. Your current lifetime
          score is <Span>{playerData.lifetimePlayerScore}</Span>.
        </div>
      )}
    </>
  );
}
