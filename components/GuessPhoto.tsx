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
            gap: "10px",
            listStyle: "none",
          }}
        >
          {imgArr.length > 0 ? (
            imgArr.map((img) => {
              const playerGuess = img;
              return (
                <li key={img.id}>
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
                    src={img.url}
                    alt={img.breed}
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
