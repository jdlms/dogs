import Image from "next/image";
import { ScaleLoader } from "react-spinners";

export function GuessName({ randomImg, namesArr, handleClick }) {
  return (
    <>
      <div style={{ height: "40%", width: "auto", marginTop: "4rem" }}>
        {randomImg ? (
          <Image
            style={{
              // height: "250px",
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
          ? namesArr.map((name) => {
              const playerGuess = name;
              return (
                <button
                  style={{ margin: "none" }}
                  onClick={() => handleClick(playerGuess)}
                  key={name.id}
                >
                  {name.breed}
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
