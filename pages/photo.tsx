/* eslint-disable react-hooks/exhaustive-deps */
import { ModalDetails } from "@/components/ModalDetails";
import { useScoreContext } from "@/context/score";
import { Dog } from "@/interfaces/dog";
import { DogObjs } from "@/interfaces/dogObjs";
import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { HardMode } from "../components/HardMode";
import { Score } from "../components/Score";

export default function Photo() {
  const scoreObj = useScoreContext();

  const [correctName, setCorrectName] = useState("");
  const [imgArr, setImgArr] = useState<DogObjs[]>([]);
  const [correctImg, setCorrectImg] = useState("");
  const [difficultyNum, setDifficultyNum] = useState(6);
  const [guess, setGuess] = useState(false);
  const [modalText, setModalText] = useState({});
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);

  console.log(modalText);

  const getRandomName = async function () {
    try {
      const res = await axios.get("/api/getDogs");
      setCorrectName(res.data[0]);
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
    const newScore = scoreObj.score + 1;
    const attemptCount = scoreObj.attempts + 1;
    setGuess(!guess);
    scoreObj.setAttempts(attemptCount);
    setModalText(correctName);
    if (playerGuess === correctName.breeds[0].name) {
      scoreObj.setScore(newScore);
      setIsGuessCorrect(true);
    } else null;
    return setisModalOpen(true);
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
      {!isModalOpen ? (
        <>
          <Score score={scoreObj.score} attempts={scoreObj.attempts} />
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
              {imgArr.length === difficultyNum ? (
                imgArr.map((img) => {
                  const playerGuess = img.breed;
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
      ) : (
        <ModalDetails
          isModalOpen={isModalOpen}
          setIsModalOpen={setisModalOpen}
          modalText={modalText}
          isGuessCorrect={isGuessCorrect}
          setIsGuessCorrect={setIsGuessCorrect}
        />
      )}
    </>
  );
}
