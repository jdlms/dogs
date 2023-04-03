import { Dog } from "@/interfaces/dog";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";
import styled from "styled-components";

export const Button = styled.button`
  display: inline;
  font-size: 0.9rem;
  border: 1px solid #c0413b;
  background: #333333;
  padding: 0.5rem;
  border-radius: 4%;
  color: #c5c5c5;
  font-weight: bold;
  cursor: pointer;
  margin: 0.5rem;
`;

export function GuessName({ randomImg, namesArr, handleClick }) {
  return (
    <>
      {randomImg ? (
        <Image
          style={{
            objectFit: "contain",
            borderWidth: "2px",
            borderColor: "#f5f5f5",
            borderStyle: "solid",
          }}
          src={randomImg}
          height={150}
          width={228}
          alt={""}
        />
      ) : (
        <div style={{ marginTop: "4rem" }}>
          <ScaleLoader color="#d3a3ac" />
        </div>
      )}
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1rem" }}
      >
        {namesArr.length > 0
          ? namesArr.map((playerGuess: Dog) => {
              return (
                <Button onClick={() => handleClick(playerGuess)} key={playerGuess.id}>
                  {playerGuess.breeds[0].name}
                </Button>
              );
            })
          : null}
      </div>
      {/* <HardMode setDifficultyNum={setDifficultyNum} setGuess={setGuess} guess={guess} /> */}
      {/* #todo hardMode  */}{" "}
    </>
  );
}
