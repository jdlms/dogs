import { LandingScoring } from "@/components/LandingScoring";
import { useEffect, useState } from "react";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

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
      {/* put this in a component and then write a conditional for if window is not undefined. */}
      {hasMounted ? <LandingScoring /> : ""}
    </div>
  );
}
