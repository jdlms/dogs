/* eslint-disable react-hooks/exhaustive-deps */
import { ModalDetails } from "@/components/ModalDetails";
import { useScoreContext } from "@/context/score";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Dog } from "@/interfaces/dog";
import { DogObjs } from "@/interfaces/dogObjs";
import { currentDay } from "@/lib/currentDay";
import { handleGuessClick } from "@/lib/handleGuessClick";
import { player } from "@/lib/player";
import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { HardMode } from "../components/HardMode";
import { Score } from "../components/Score";

const component = "photo";

export default function Photo() {
  const scoreObj = useScoreContext();
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);

  const [correctName, setCorrectName] = useState("");
  const [imgArr, setImgArr] = useState<DogObjs[]>([]);
  const [correctImg, setCorrectImg] = useState("");
  const [difficultyNum, setDifficultyNum] = useState(6);
  const [guess, setGuess] = useState(false);
  const [modalText, setModalText] = useState({});
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getRandomName();
      if (playerData.nameAttempts === 0) {
        const playerDataNewDate = {
          ...playerData,
          dayOfWeek: currentDay,
          byNameAttempts: playerData.byNameAttempts,
          byPhotoAttempts: playerData.byPhotoAttempts,
        };
        setPlayerData(playerDataNewDate);
      }
      if (currentDay !== playerData.dayOfWeek) {
        const playerDataNewDate = {
          ...playerData,
          dayOfWeek: currentDay,
          byNameAttempts: 5,
          byPhotoAttempts: playerData.byPhotoAttempts,
        };
        setPlayerData(playerDataNewDate);
      }
    }
    return () => {
      isSubscribed = false;
    };
  }, [guess]);

  const getRandomName = async function () {
    try {
      const res = await axios.get("/api/getDogs");
      setCorrectName(res.data[0]);
      setCorrectImg(res.data[0].url);
      let dogImgArr: DogObjs[] = [];
      res.data.map((dogObj: Dog) => {
        const dogName = dogObj.breeds[0].name;
        if (!dogImgArr.includes(dogName) && dogImgArr.length < difficultyNum) {
          return dogImgArr.push({
            url: dogObj.url,
            breed: dogObj.breeds[0].name,
            id: dogObj.id,
          });
        }
      });
      shuffleArray(dogImgArr);
      setImgArr(dogImgArr);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const handleClick = (playerGuess: { url: string; breed: string; id: string }) => {
    handleGuessClick(
      playerGuess,
      scoreObj,
      guess,
      setGuess,
      setModalText,
      correctName,
      playerData,
      setPlayerData,
      setIsGuessCorrect,
      setisModalOpen,
      component
    );
  };

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
