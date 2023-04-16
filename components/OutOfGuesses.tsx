import { Player } from "@/interfaces/player";

type OutOfGuessesProps = {
  component: string;
  playerData: Player;
};

export function OutOfGuesses({ component, playerData }: OutOfGuessesProps) {
  console.log(playerData.byPhotoAttempts);
  return (
    <p style={{ fontSize: "1.5rem", display: "inline", textAlign: "center", marginTop: "0px" }}>
      You&apos;re out of {component === "name" ? "guesses by name!" : "guesses by photo!"}
      {" "}
      {component === "name" && playerData.byPhotoAttempts > 0 ? " Try guessing by photo. " : null}
      {component === "photo" && playerData.byNameAttempts > 0 ? " Try guessing by name. " : null}
      Come back tomorrow and try to collect more breeds.
    </p>
  );
}
