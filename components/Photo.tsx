/* eslint-disable react-hooks/exhaustive-deps */
import { Dog } from "@/interfaces/dog";
import { DogObjs } from "@/interfaces/dogObjs";
import { ScoringProps } from "@/interfaces/scoringProps";
import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { HardMode } from "./HardMode";
import { Frames } from "./placeholders/Frames";
import { Score } from "./Score";

export default function Photo({ score, setScore, attempts, setAttempts }: ScoringProps) {
  const [correctName, setCorrectName] = useState("");
  const [imgArr, setImgArr] = useState<DogObjs[]>([]);
  const [correctImg, setCorrectImg] = useState("");
  const [difficultyNum, setDifficultyNum] = useState(5);
  const [guess, setGuess] = useState(false);

  const getRandomName = async function () {
    try {
      const res = await axios.get("/api/getDogs");
      setCorrectName(res.data[0].breeds[0].name);
      setCorrectImg(res.data[0].url);

      let dogImgArr: DogObjs[] = [];

      res.data.map((dogObj: Dog) => {
        if (dogImgArr.length < difficultyNum) {
          return dogImgArr.push({
            url: dogObj.url,
            breed: dogObj.breeds[0].name,
            id: crypto.randomUUID(),
          });
        }
      });
      shuffleArray(dogImgArr);
      setImgArr(dogImgArr);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const handleClick = (playerGuess: string) => {
    const newScore = score + 1;
    const attemptCount = attempts + 1;
    setGuess(!guess);
    setAttempts(attemptCount);
    return playerGuess === correctName ? setScore(newScore) : null;
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getRandomName();
    }
    return () => {
      isSubscribed = false;
    };
  }, [guess]);

  return (
    <>
      <Score score={score} attempts={attempts} />
      <HardMode setDifficultyNum={setDifficultyNum} setGuess={setGuess} guess={guess} />
      <div style={{ height: "54px" }}>
        {correctName ? <button style={{ margin: "none" }}>{correctName}</button> : null}
      </div>
      <div>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
            listStyle: "none",
          }}
        >
          {imgArr.length === difficultyNum ? (
            imgArr.map((img) => {
              const playerGuess = img.breed;
              return (
                <li key={img.id}>
                  <img
                    onClick={() => handleClick(playerGuess)}
                    style={{
                      height: "150px",
                      objectFit: "fill",
                      borderWidth: "2px",
                      borderColor: "white",
                      borderStyle: "solid",
                      cursor: "pointer",
                    }}
                    src={img.url}
                    alt={img.breed}
                  />
                </li>
              );
            })
          ) : (
            <ScaleLoader color="#ffffff" />
          )}
        </ul>
      </div>
    </>
  );
}
