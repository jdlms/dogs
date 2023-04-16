/* eslint-disable react-hooks/exhaustive-deps */
import { GuessPhoto } from "@/components/GuessPhoto";
import { ModalDetails } from "@/components/ModalDetails";
import { OutOfGuesses } from "@/components/OutOfGuesses";
import { useScoreContext } from "@/context/score";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Dog } from "@/interfaces/dog";
import { currentDay } from "@/lib/currentDay";
import { handleGuessClick } from "@/lib/handleGuessClick";
import { player } from "@/lib/player";
import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { useEffect, useState } from "react";
import { HardMode } from "../components/HardMode";
import { PageTitle } from "@/components/PageTitle";

const component = "photo";

export default function Photo() {
  const scoreObj = useScoreContext();
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);
  const [correctName, setCorrectName] = useState<Dog | undefined>(undefined);
  const [imgArr, setImgArr] = useState<Dog[]>([]);
  const [correctImg, setCorrectImg] = useState("");
  const [difficultyNum, setDifficultyNum] = useState(5);
  const [guess, setGuess] = useState(false);
  const [modalText, setModalText] = useState<Dog | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getRandomName();
      if (playerData.nameAttempts === 0) {
        const playerDataNewDate = {
          ...playerData,
          dayOfTheWeek: currentDay,
          byNameAttempts: playerData.byNameAttempts,
          byPhotoAttempts: playerData.byPhotoAttempts,
        };
        setPlayerData(playerDataNewDate);
      }
      if (currentDay !== playerData.dayOfTheWeek) {
        const playerDataNewDate = {
          ...playerData,
          dayOfTheWeek: currentDay,
          byNameAttempts: 5,
          byPhotoAttempts: 5,
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
      const randomDog = Math.floor(Math.random() * res.data.length);
      setCorrectName(res.data[randomDog]);
      setCorrectImg(res.data[0].url);
      let dogImgArr: Dog[] = [];
      dogImgArr.push(res.data[randomDog]);

      res.data.filter((dogObj: Dog) => {
        const dogName = dogObj.breeds[0].name;
        if (
          !dogImgArr.some((dog) => dog.breeds[0].name === dogName) &&
          dogImgArr.length < difficultyNum
        ) {
          return dogImgArr.push(dogObj);
        }
      });
      shuffleArray(dogImgArr);
      setImgArr(dogImgArr);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const handleClick = (playerGuess: Dog) => {
    handleGuessClick(
      playerGuess,
      scoreObj,
      guess,
      setGuess,
      setModalText,
      playerData,
      setPlayerData,
      setIsGuessCorrect,
      setIsModalOpen,
      component,
      correctName
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "4rem",
      }}
    >
      <PageTitle />

      {playerData.byPhotoAttempts === 0 && !isModalOpen ? (
        <OutOfGuesses component={component} playerData={playerData} />
      ) : !isModalOpen ? (
        <GuessPhoto correctName={correctName} imgArr={imgArr} handleClick={handleClick} />
      ) : (
        <ModalDetails
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalText={modalText}
          isGuessCorrect={isGuessCorrect}
          setIsGuessCorrect={setIsGuessCorrect}
        />
      )}
    </div>
  );
}
