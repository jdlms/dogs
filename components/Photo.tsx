import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { useEffect, useState } from "react";
import { Score } from "./Score";

export default function Photo({ score, setScore, attempts, setAttempts }) {
  const [randomName, setRandomName] = useState([]);

  const [imgArr, setImgArr] = useState([]);
  const [correctImg, setCorrectImg] = useState("");

  const [difficultyNum, setDifficultyNum] = useState(5);

  const getRandomName = async function () {
    try {
      console.log("hitting the api...");
      const res = await axios.get("/api/getDogs");
      setRandomName(res.data[0].breeds[0].name);
      setCorrectImg(res.data[0].url);

      let dogImgArr: object[] = [];

      res.data.map((dogObj) => {
        if (dogImgArr.includes(dogObj.url) === false && dogImgArr.length < difficultyNum) {
          return dogImgArr.push({
            url: dogObj.url,
            breed: dogObj.breeds[0].name,
            id: crypto.randomUUID(),
          });
        }
      });
      shuffleArray(dogImgArr);
      setImgArr(dogImgArr);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      getRandomName();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <Score score={score} attempts={attempts} />
      {randomName ? <button>{randomName}</button> : null}
      <ul style={{ display: "flex", flexDirection: "row", gap: "10px", listStyle: "none" }}>
        {imgArr.length > 0
          ? imgArr.map((img) => (
              <li key={img.id}>
                <img style={{ height: "100px", objectFit: "fill" }} src={img.url} alt={img.breed} />
              </li>
            ))
          : "Loading..."}
      </ul>
    </>
  );
}
