import { Span } from "./Score";

export function NoScoreYet() {
  return (
    <div
      style={{
        width: "100%",
        fontSize: "1.5rem",
      }}
    >
      <div>
        Dog breeds collected so far: <Span>0</Span>
      </div>
      <p> Time to start guessing!</p>
    </div>
  );
}
