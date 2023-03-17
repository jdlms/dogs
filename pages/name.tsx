/* eslint-disable react-hooks/exhaustive-deps */
import { Dog } from "@/interfaces/dog";
import { DogObjs } from "@/interfaces/dogObjs";
import { ScoringProps } from "@/interfaces/scoringProps";
import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { useEffect, useState } from "react";
import { HardMode } from "../components/HardMode";
import { Score } from "../components/Score";
import ScaleLoader from "react-spinners/ScaleLoader";
import Image from "next/image";
import { useScoreContext } from "@/context/score";

export default function Name() {
  const scoreObj = useScoreContext();

  const [randomImg, setRandomImg] = useState("");
  const [namesArr, setNamesArr] = useState<DogObjs[]>([]);
  const [correctName, setCorrectName] = useState("");
  const [guess, setGuess] = useState(false);
  const [difficultyNum, setDifficultyNum] = useState(6);

  const getRandomImg = async function () {
    try {
      const res = await axios.get("/api/getDogs");
      setRandomImg(res.data[0].url);
      setCorrectName(res.data[0].breeds[0].name);
      let dogNamesArr: DogObjs[] = [];
      // #todo in this .map breed name duplications are currently possible
      res.data.filter((dogObj: Dog) => {
        if (dogNamesArr.length < difficultyNum) {
          return dogNamesArr.push({
            url: dogObj.url,
            breed: dogObj.breeds[0].name,
            id: crypto.randomUUID(),
          });
        }
      });
      shuffleArray(dogNamesArr);
      setNamesArr(dogNamesArr);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const handleClick = (playerGuess: string) => {
    const newScore = scoreObj.score + 1;
    const attemptCount = scoreObj.attempts + 1;
    setGuess(!guess);
    scoreObj.setAttempts(attemptCount);
    return playerGuess === correctName ? scoreObj.setScore(newScore) : null;
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getRandomImg();
    }
    return () => {
      isSubscribed = false;
    };
  }, [guess]);

  return (
    <>
      <Score score={scoreObj.score} attempts={scoreObj.attempts} />
      <div style={{ height: "40%", width: "auto" }}>
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
          <ScaleLoader color="#ffffff" />
        )}
      </div>
      <div style={{ display: "inline", alignItems: "center" }}>
        {namesArr.length > 0
          ? namesArr.map((name) => {
              const playerGuess = name.breed;
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
      <HardMode setDifficultyNum={setDifficultyNum} setGuess={setGuess} guess={guess} />
    </>
  );
}
