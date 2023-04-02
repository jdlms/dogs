import { Dog } from "@/interfaces/dog";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";

export function GuessName({ randomImg, namesArr, handleClick }) {
  return (
    <>
      <div style={{ height: "40%", width: "auto", marginTop: "4rem" }}>
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
      </div>
      <div style={{ display: "inline", alignItems: "center" }}>
        {namesArr.length > 0
          ? namesArr.map((playerGuess: Dog) => {
              return (
                <button
                  style={{ margin: "none" }}
                  onClick={() => handleClick(playerGuess)}
                  key={playerGuess.id}
                >
                  {playerGuess.breeds[0].name}
                </button>
              );
            })
          : null}
      </div>
      {/* <HardMode setDifficultyNum={setDifficultyNum} setGuess={setGuess} guess={guess} /> */}
      {/* #todo hardMode  */}{" "}
    </>
  );
}
