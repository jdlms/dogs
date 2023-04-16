import { Dog } from "@/interfaces/dog";
import Image from "next/image";
import styled from "styled-components";
import { Loader } from "./Loader";
import { useState } from "react";
import { string } from "joi";

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

type guessNameProps = {
  randomImg: string;
  namesArr: Dog[];
  handleClick: (playerguess: Dog) => void;
  disabled: boolean;
};

export function GuessName({ randomImg, namesArr, handleClick, disabled }: guessNameProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  function handleImageLoad(event: any) {
    setImageSize({ width: event.target.width, height: event.target.height });
  }

  return (
    <>
      {randomImg ? (
        <Image
          style={{
            objectFit: "contain",
          }}
          src={randomImg}
          onLoad={handleImageLoad}
          width={imageSize.width || 240}
          height={imageSize.height || 160}
          alt={""}
        />
      ) : (
        <Loader />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "1rem",
          flexWrap: "wrap",
          gap: "5px",
          listStyle: "none",
          justifyContent: "space-around",
        }}
      >
        {namesArr.length > 0
          ? namesArr.map((playerGuess: Dog) => {
              return (
                <Button
                  disabled={disabled}
                  onClick={() => handleClick(playerGuess)}
                  key={playerGuess.id}
                >
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
