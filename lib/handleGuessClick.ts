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
  setModalText: DispatchuseState<Dog[]>,
  correctName: Dog,
  playerData: Player,
  setPlayerData: Dispatch<SetStateAction<Player>>,
  setIsGuessCorrect: Dispatch<SetStateAction<boolean>>,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  component: string,
  setDisabled?: Dispatch<SetStateAction<boolean>>
) => {
  if (setDisabled) {
    setDisabled(true);
  }
  const newScore = (scoreObj.score += 1);
  const attemptCount = (scoreObj.attempts += 1);
  setGuess(!guess);
  scoreObj.setAttempts(attemptCount);
  setModalText(correctName);

  if (playerGuess.breeds[0].name === correctName) {
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

    if (!playerDataWhenCorrect.correctBreedIds.includes(playerGuess.breeds[0].name)) {
      playerDataWhenCorrect.correctBreedIds.push(playerGuess.breeds[0].name);
    }

    setPlayerData(playerDataWhenCorrect);
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
  }

  return setIsModalOpen(true);
};
