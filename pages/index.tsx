import { LandingScoring } from "@/components/LandingScoring";
import { PageTitle } from "@/components/PageTitle";
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
        width: "70%",
      }}
    >
      <PageTitle />
      <p style={{ fontSize: "1.5rem", marginTop: "2rem" }}>
        Guess five dogs each, by name & by photo, each day. Correctly guess a dog to add it to your
        collection and gain points. Visit every day to grow your collection and improve your dog
        guessing skills!
      </p>
      {hasMounted ? <LandingScoring /> : ""}
    </div>
  );
}
