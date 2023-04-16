/* eslint-disable react-hooks/exhaustive-deps */
import { Dog } from "@/interfaces/dog";
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
import { PageTitle } from "@/components/PageTitle";

const component = "name";

export default function Name() {
  const scoreObj = useScoreContext();
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);

  const [randomImg, setRandomImg] = useState("");
  const [namesArr, setNamesArr] = useState<Dog[]>([]);
  const [correctName, setCorrectName] = useState<Dog | undefined>(undefined);
  const [difficultyNum, setDifficultyNum] = useState(6);
  const [guess, setGuess] = useState(false);
  const [modalText, setModalText] = useState<Dog | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getRandomImg();
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
      const randomDog = Math.floor(Math.random() * res.data.length);
      setRandomImg(res.data[randomDog].url);

      setCorrectName(res.data[randomDog]);

      let dogNamesArr: Dog[] = [];
      dogNamesArr.push(res.data[randomDog]);

      // #todo in this .map breed name duplications are currently possible
      res.data.filter((dogObj: Dog) => {
        let dogName: string = dogObj.breeds[0].name;
        if (
          !dogNamesArr.some((dog) => dog.breeds[0].name === dogName) &&
          dogNamesArr.length < difficultyNum
        ) {
          return dogNamesArr.push(dogObj);
        }
      });
      shuffleArray(dogNamesArr);
      setNamesArr(dogNamesArr);
      setDisabled(false);
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
      correctName,
      setDisabled
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

      {playerData.byNameAttempts === 0 && !isModalOpen ? (
        <OutOfGuesses />
      ) : !isModalOpen ? (
        <GuessName
          randomImg={randomImg}
          namesArr={namesArr}
          handleClick={handleClick}
          disabled={disabled}
        />
      ) : (
        <ModalDetails
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalText={modalText}
          isGuessCorrect={isGuessCorrect}
          setIsGuessCorrect={setIsGuessCorrect}
          setDisabled={setDisabled}
        />
      )}
    </div>
  );
}
