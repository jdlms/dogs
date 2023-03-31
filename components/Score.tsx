import styled from "styled-components";

interface Props {
  score: number;
  attempts: number;
}

export const Span = styled.div`
  border-width: 1px;
  border-color: white;
  border-style: solid;
  display: inline;
  padding: 1px;
  color: red;
`;
export function Score({ score, attempts }: Props) {
  return (
    <>
      <h4
        style={{
          display: "inline",
          borderWidth: "3px",
          borderColor: "#0f0f13",
          borderStyle: "solid",
          padding: "5px",
        }}
      >
        Current points: <Span>{score}</Span>
      </h4>
    </>
  );
}
