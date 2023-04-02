import { Span } from "./Score";

export function NoScoreYet() {
  return (
    <div style={{ paddingBottom: "10px", borderBottom: "solid 1px white", width: "320px" }}>
      <div>
        Dog breeds collected so far: <Span>0</Span>.
      </div>
      <p> Time to start guessing!</p>
    </div>
  );
}
