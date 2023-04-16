import { Dog } from "./dog";

export interface Player {
  lifetimePlayerGuesses: number;
  lifetimePlayerScore: number;
  correctBreedIds: Dog[];
  dayOfTheWeek: string;
  byNameAttempts: number;
  byPhotoAttempts: number;
}
