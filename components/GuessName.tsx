import { Dog } from "@/interfaces/dog";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";
import styled from "styled-components";

export const Button = styled.button`
  display: inline;
  font-size: 0.9rem;
  border: 1px solid white;
  background: white;
  padding: 0.5rem;
  border-radius: 4%;
  color: #1c1b22;
  font-weight: bold;
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
            borderColor: "white",
            borderStyle: "solid",
          }}
          src={randomImg}
          height={150}
          width={228}
          alt={""}
        />
      ) : (
        <div style={{ marginTop: "4rem" }}>
          <ScaleLoader color="#ffffff" />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
