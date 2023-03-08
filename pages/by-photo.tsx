import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ByImage() {
  const [randomName, setRandomName] = useState([]);
  const [correctImg, setCorrectImg] = useState("");
  const [imgArr, setImgArr] = useState([]);

  const [difficulty, setDifficulty] = useState(5);

  const getRandomName = async function () {
    try {
      const res = await axios.get("/api/getDogs");
// const nameToGuess = [{url: }]

      setRandomName(res.data[0].breeds[0].name);

      setCorrectImg(res.data[0].url);

      let dogImgArr: object[] = [];

      res.data.map((dogObj) => {
        if (dogImgArr.includes(dogObj.url) === false && dogImgArr.length < difficulty) {
          return dogImgArr.push({
            url: dogObj.url,
            breed: dogObj.breeds[0].name,
            id: crypto.randomUUID(),
          });
        }
      });
      shuffleArray(dogImgArr);
      setImgArr(dogImgArr)
      console.table(imgArr);
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

  return <div>guess by image TK</div>;
}
