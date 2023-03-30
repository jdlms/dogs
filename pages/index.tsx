import { Span } from "@/components/Score";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styled from "styled-components";
import { player } from "./name";

export default function Home() {
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);
  console.log(playerData);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "20rem",
      }}
    >
      <span style={{ fontSize: 14, marginTop: ".5rem" }}>welcome to...</span>
      <h1 style={{ marginTop: ".5rem" }}>Guess that dog!</h1>

      <p>
        Guess five dogs each, by name & by photo, each day. Correctly guess a dog to add it to your
        collection and gain points. Visit every day to grow your collection and improve your dog
        guessing skills!
      </p>
      <div style={{ paddingBottom: "10px" }}>
        You&apos;ve made a total of <Span>{playerData.lifetimePlayerGuesses}</Span> guesses and
        collected <Span>{playerData.correctBreedIds.length}</Span> breeds. Your current lifetime
        score is <Span>{playerData.lifetimePlayerScore}</Span>.
      </div>
    </div>
  );
}
