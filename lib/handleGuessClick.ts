import { Dog } from "@/interfaces/dog";
import { currentDay } from "./currentDay";

export const handleGuessClick = (
  playerGuess: Dog,
  scoreObj,
  guess,
  setGuess,
  setModalText,
  correctName,
  playerData,
  setPlayerData,
  setIsGuessCorrect,
  setIsModalOpen,
  component,
  setDisabled
) => {
  if (setDisabled) {
    setDisabled(true);
  }
  const newScore = (scoreObj.score += 1);
  const attemptCount = (scoreObj.attempts += 1);
  setGuess(!guess);
  scoreObj.setAttempts(attemptCount);
  setModalText(correctName);

  if (playerGuess.breeds[0].name === correctName.breeds[0].name) {
    scoreObj.setScore(newScore);

    const playerDataWhenCorrect = {
      lifetimePlayerGuesses: ++playerData.lifetimePlayerGuesses,
      lifetimePlayerScore: ++playerData.lifetimePlayerScore,
      correctBreedIds: [...playerData.correctBreedIds],
      dayOfWeek: currentDay,
      byNameAttempts:
        component === "name" ? --playerData.byNameAttempts : playerData.byNameAttempts,
      byPhotoAttempts:
        component === "photo" ? --playerData.byPhotoAttempts : playerData.byPhotoAttempts,
    };

    if (!playerDataWhenCorrect.correctBreedIds.includes(playerGuess)) {
      playerDataWhenCorrect.correctBreedIds.push(playerGuess);
    }

    setPlayerData(playerDataWhenCorrect);
    setIsGuessCorrect(true);
  } else {
    const playerDataWhenWrong = {
      lifetimePlayerGuesses: ++playerData.lifetimePlayerGuesses,
      lifetimePlayerScore: playerData.lifetimePlayerScore,
      correctBreedIds: [...playerData.correctBreedIds],
      dayOfWeek: currentDay,
      byNameAttempts:
        component === "name" ? --playerData.byNameAttempts : playerData.byNameAttempts,
      byPhotoAttempts:
        component === "photo" ? --playerData.byPhotoAttempts : playerData.byPhotoAttempts,
    };
    setPlayerData(playerDataWhenWrong);
  }

  return setIsModalOpen(true);
};
