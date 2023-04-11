import styled from "styled-components";

interface Props {
  score: number;
  attempts: number;
}

export const Span = styled.div`
  border-width: 1px;
  border-color: #d3a3ac;
  border-style: solid;
  display: inline;
  padding: 2px;
  background-color: #c0413b;
  color: #c5c5c5;
`;

export function Score({ score, attempts }: Props) {
  return (
    <>
      <h4
        style={{
          display: "inline",
          borderWidth: "3px",
          borderColor: "#d3a3ac",
          borderStyle: "solid",
          padding: "5px",
          color: "#333333",
        }}
      >
        Current points: <Span>{score}</Span>
      </h4>
    </>
  );
}
