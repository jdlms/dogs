import { Dog } from "@/interfaces/dog";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";

export function GuessPhoto({ correctName, imgArr, handleClick }) {
  return (
    <>
      <div style={{ height: "54px" }}>
        {correctName ? (
          <h2 style={{ margin: "none", textDecoration: "underline" }}>
            {correctName.breeds[0].name}
          </h2>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "5px",
            listStyle: "none",
            justifyContent: "space-around",
            padding: 0,
          }}
        >
          {imgArr.length > 0 ? (
            imgArr.map((playerGuess: Dog) => {
              return (
                <li key={playerGuess.id}>
                  <Image
                    className="dogPic"
                    onClick={() => handleClick(playerGuess)}
                    style={{
                      // height: "150px",
                      objectFit: "fill",
                      borderWidth: "2px",
                      borderColor: "white",
                      borderStyle: "solid",
                      cursor: "pointer",
                    }}
                    src={playerGuess.url}
                    alt={playerGuess.breeds[0].name}
                    height={150}
                    width={200}
                  />
                </li>
              );
            })
          ) : (
            <ScaleLoader color="#ffffff" />
          )}
        </ul>
      </div>
      {/* <HardMode setDifficultyNum={setDifficultyNum} setGuess={setGuess} guess={guess} /> */}
    </>
  );
}
