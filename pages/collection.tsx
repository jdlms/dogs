/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { player } from "@/lib/player";
import { getCollection } from "./api/getCollection";
import { useEffect } from "react";

export default function Collection() {
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);

  let ids = playerData.correctBreedIds;
  console.log(ids);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getDogs();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  const getDogs = async function () {
    try {
      const res = await getCollection(ids);
      console.log(res);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  return <></>;
}
