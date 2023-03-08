import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { attempt } from "joi";
import { useEffect, useState } from "react";

export default function ByName() {
  const [randomImg, setRandomImg] = useState("");
  const [correctName, setCorrectName] = useState("");
  const [namesArr, setNamesArr] = useState([]);
  const [guess, setGuess] = useState(false);

  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const [difficulty, setDifficulty] = useState(5);

  const getRandomImg = async function () {
    try {
      const res = await axios.get("/api/getRandomImage");
      setRandomImg(res.data[0].url);

      setCorrectName(res.data[0].breeds[0].name);

      let dogNamesArr: string[] = [];
      let dogNamesObj: object[] = [];
      res.data.map((dogObj, index) => {
        if (
          dogNamesArr.includes(dogObj.breeds[0].name) === false &&
          dogNamesArr.length < difficulty
        ) {
          return dogNamesArr.push(dogObj.breeds[0].name);
        }
      });
      shuffleArray(dogNamesArr);
      dogNamesArr.map((name) => {
        return dogNamesObj.push({
          id: crypto.randomUUID(),
          breed: name,
        });
      });
      setNamesArr(dogNamesObj);
      console.table(dogNamesObj);
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
    setDifficulty(20);
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
      <h1>Guess that Dog!</h1>
      <h2 style={{ display: "inline" }}>
        Score: {score} / Attempts: {attempts}
      </h2>
      <button onClick={() => hardModeClick()}>Hard Mode</button>
      <div style={{ height: "40%", width: "auto" }}>
        <img style={{ height: "250px", objectFit: "contain" }} src={randomImg} alt="" />
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
