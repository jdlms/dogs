import { currentDay } from "./currentDay";

export const handleGuessClick = (
  playerGuess: { url: string; breed: string; id: string },
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
) => {
  const newScore = (scoreObj.score += 1);
  const attemptCount = (scoreObj.attempts += 1);
  setGuess(!guess);
  scoreObj.setAttempts(attemptCount);
  setModalText(correctName);

  if (playerGuess.breed === correctName.breeds[0].name) {
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
    playerDataWhenCorrect.correctBreedIds.push(playerGuess.id);
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
  return setisModalOpen(true);
};
