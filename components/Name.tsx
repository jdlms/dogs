import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { useEffect, useState } from "react";
import { Score } from "./Score";

export default function Name({ score, setScore, attempts, setAttempts }) {
  const [randomImg, setRandomImg] = useState("");

  const [namesArr, setNamesArr] = useState([]);
  const [correctName, setCorrectName] = useState("");

  const [guess, setGuess] = useState(false);

  const [difficultyNum, setDifficultyNum] = useState(5);

  const getRandomImg = async function () {
    try {
      const res = await axios.get("/api/getDogs");
      setRandomImg(res.data[0].url);
      setCorrectName(res.data[0].breeds[0].name);

      let dogNamesArr: object[] = [];
      let dogNamesObj: object[] = [];

      res.data.map((dogObj) => {
        if (
          dogNamesArr.includes(dogObj.breeds[0].name) === false &&
          dogNamesArr.length < difficultyNum
        ) {
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

  const handleClick = (playerGuess) => {
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
