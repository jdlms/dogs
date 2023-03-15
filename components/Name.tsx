/* eslint-disable react-hooks/exhaustive-deps */
import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Score } from "./Score";

interface ScoringProps {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  attempts: number;
  setAttempts: Dispatch<SetStateAction<number>>;
}

interface Dog {
  breeds: [
    {
      bred_for: string;
      breed_group: string;
      height: {
        imperial: string;
        metric: string;
      };
      id: number;
      life_span: string;
      name: string;
      reference_image_id: string;
      temperament: string;
      weight: {
        imperial: string;
        metric: string;
      };
    }
  ];
  height: number;
  id: string;
  url: string;
  width: number;
}

interface StateProperties {
  url: string;
  breed: string;
  id: string;
}

export default function Name({ score, setScore, attempts, setAttempts }: ScoringProps) {
  const [randomImg, setRandomImg] = useState("");
  const [namesArr, setNamesArr] = useState<StateProperties[]>([]);
  const [correctName, setCorrectName] = useState("");
  const [guess, setGuess] = useState(false);
  const [difficultyNum, setDifficultyNum] = useState(5);

  const getRandomImg = async function () {
    try {
      const res = await axios.get("/api/getDogs");
      setRandomImg(res.data[0].url);
      setCorrectName(res.data[0].breeds[0].name);

      let dogNamesArr: StateProperties[] = [];

      // #todo in this .map breed name duplications are currently possible

      res.data.map((dogObj: Dog) => {
        console.log(dogObj.breeds[0].name);
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
    const newScore = score + 1;
    const attemptCount = attempts + 1;
    setGuess(!guess);
    setAttempts(attemptCount);
    return playerGuess === correctName ? setScore(newScore) : null;
  };

  const hardModeClick = () => {
    setDifficultyNum(15);
    setGuess(!guess);
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
      <Score score={score} attempts={attempts} />
      <button onClick={() => hardModeClick()}>Hard Mode</button>
      <div style={{ height: "40%", width: "auto" }}>
        <img style={{ height: "250px", objectFit: "contain" }} src={randomImg} alt={""} />
      </div>
      <div>
        {namesArr.length > 0
          ? namesArr.map((name) => {
              const playerGuess = name.breed;
              return (
                <button onClick={() => handleClick(playerGuess)} key={name.id}>
                  {name.breed}
                </button>
              );
            })
          : "Loading..."}
      </div>
    </>
  );
}
