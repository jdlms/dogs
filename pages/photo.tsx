/* eslint-disable react-hooks/exhaustive-deps */
import { GuessPhoto } from "@/components/GuessPhoto";
import { ModalDetails } from "@/components/ModalDetails";
import { OutOfGuesses } from "@/components/OutOfGuesses";
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
  const [imgArr, setImgArr] = useState<Dog[]>([]);
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
      let dogImgArr: Dog[] = [];
      res.data.filter((dogObj: Dog) => {
        const dogName = dogObj.breeds[0].name;
        if (!dogImgArr.includes(dogName) && dogImgArr.length < difficultyNum) {
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
      {playerData.byPhotoAttempts === 0 && !isModalOpen ? (
        <OutOfGuesses />
      ) : !isModalOpen ? (
        <GuessPhoto correctName={correctName} imgArr={imgArr} handleClick={handleClick} />
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
