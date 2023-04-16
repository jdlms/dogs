import { Dog } from "@/interfaces/dog";
import { ScoringProps } from "@/interfaces/scoringProps";
import { currentDay } from "./currentDay";
import { Dispatch, SetStateAction } from "react";
import { Player } from "@/interfaces/player";

export const handleGuessClick = (
  playerGuess: Dog,
  scoreObj: ScoringProps,
  guess: boolean,
  setGuess: Dispatch<SetStateAction<boolean>>,
  setModalText: Dispatch<SetStateAction<Dog | undefined>>,
  playerData: Player,
  setPlayerData: Dispatch<SetStateAction<Player>>,
  setIsGuessCorrect: Dispatch<SetStateAction<boolean>>,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  component: string,
  correctName?: Dog,
  setDisabled?: Dispatch<SetStateAction<boolean>>
) => {
  if (setDisabled) {
    setDisabled(true);
  }
  const newScore = scoreObj.score + 1;
  const attemptCount = (scoreObj.attempts += 1);
  setGuess(!guess);
  scoreObj.setAttempts(attemptCount);
  setModalText(correctName);

  if (playerGuess.breeds[0].name === correctName?.breeds[0].name) {
    scoreObj.setScore(newScore);

    const playerDataWhenCorrect = {
      lifetimePlayerGuesses: ++playerData.lifetimePlayerGuesses,
      lifetimePlayerScore: ++playerData.lifetimePlayerScore,
      correctBreedIds: [...playerData.correctBreedIds],
      dayOfTheWeek: currentDay,
      byNameAttempts:
        component === "name" ? --playerData.byNameAttempts : playerData.byNameAttempts,
      byPhotoAttempts:
        component === "photo" ? --playerData.byPhotoAttempts : playerData.byPhotoAttempts,
    };

    const hasBreedAlready = playerDataWhenCorrect.correctBreedIds.some(
      (dog: Dog) => dog.breeds[0].name === playerGuess.breeds[0].name
    );

    if (!hasBreedAlready) {
      playerDataWhenCorrect.correctBreedIds.push(playerGuess);
    }

    setPlayerData(playerDataWhenCorrect);
    console.log("hi!");

    setIsGuessCorrect(true);
  } else {
    const playerDataWhenWrong = {
      lifetimePlayerGuesses: ++playerData.lifetimePlayerGuesses,
      lifetimePlayerScore: playerData.lifetimePlayerScore,
      correctBreedIds: [...playerData.correctBreedIds],
      dayOfTheWeek: currentDay,
      byNameAttempts:
        component === "name" ? --playerData.byNameAttempts : playerData.byNameAttempts,
      byPhotoAttempts:
        component === "photo" ? --playerData.byPhotoAttempts : playerData.byPhotoAttempts,
    };

    setPlayerData(playerDataWhenWrong);
    setIsGuessCorrect(false);
  }

  return setIsModalOpen(true);
};
