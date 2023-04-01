/* eslint-disable react-hooks/exhaustive-deps */
import { Dog } from "@/interfaces/dog";
import { DogObjs } from "@/interfaces/dogObjs";
import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { useEffect, useState } from "react";
import { HardMode } from "../components/HardMode";
import { useScoreContext } from "@/context/score";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { player } from "@/lib/player";
import { OutOfGuesses } from "@/components/OutOfGuesses";
import { currentDay } from "@/lib/currentDay";
import { GuessName } from "@/components/GuessName";
import { ModalDetails } from "@/components/ModalDetails";
import { handleGuessClick } from "@/lib/handleGuessClick";

const component = "name";

export default function Name() {
  const scoreObj = useScoreContext();
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);

  const [randomImg, setRandomImg] = useState("");
  const [namesArr, setNamesArr] = useState<DogObjs[]>([]);
  const [correctName, setCorrectName] = useState({});
  const [difficultyNum, setDifficultyNum] = useState(6);
  const [guess, setGuess] = useState(false);
  const [modalText, setModalText] = useState({});
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getRandomImg();
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

  const getRandomImg = async function () {
    try {
      const res = await axios.get("/api/getDogs");
      setRandomImg(res.data[0].url);
      setCorrectName(res.data[0]);
      let dogNamesArr: DogObjs[] = [];
      // #todo in this .map breed name duplications are currently possible
      res.data.filter((dogObj: Dog) => {
        const dogName = dogObj.breeds[0].name;
        if (!dogNamesArr.includes(dogName) && dogNamesArr.length < difficultyNum) {
          return dogNamesArr.push({
            url: dogObj.url,
            breed: dogObj.breeds[0].name,
            id: dogObj.id,
          });
        }
      });
      shuffleArray(dogNamesArr);
      setNamesArr(dogNamesArr);
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
      {playerData.byNameAttempts === 0 && !isModalOpen ? (
        <OutOfGuesses />
      ) : !isModalOpen ? (
        <GuessName randomImg={randomImg} namesArr={namesArr} handleClick={handleClick} />
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
