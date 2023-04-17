import { Dog } from "@/interfaces/dog";
import Image from "next/image";
import { Loader } from "./Loader";

type guessPhotoProps = {
  correctName: Dog | undefined;
  imgArr: Dog[] | undefined;
  handleClick: (playerguess: Dog) => void;
};

export function GuessPhoto({ correctName, imgArr, handleClick }: guessPhotoProps) {
  return (
    <>
      <div>
        {correctName ? (
          <h2
            style={{
              margin: "none",
              border: "solid 2px #f5f5f5",
              padding: "3px",
              borderRadius: "4px",
            }}
          >
            {correctName.breeds ? correctName.breeds[0].name : ""}
          </h2>
        ) : null}
      </div>
      <div>
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
          {imgArr ? (
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
                      borderColor: "#c0413b",
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
            <Loader />
          )}
        </ul>
      </div>
      {/* <HardMode setDifficultyNum={setDifficultyNum} setGuess={setGuess} guess={guess} /> */}
    </>
  );
}
