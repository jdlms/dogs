import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ByName() {
  const [randomImg, setRandomImg] = useState("");
  const [correctName, setCorrectName] = useState("");

  const [namesArr, setNamesArr] = useState([]);

  const handleClick = async function () {
    try {
      const res = await axios.get("/api/getRandomImage");
      console.log("hitting the api!");
      setRandomImg(res.data[0].url);

      setCorrectName(res.data[0].breeds[0].name);

      let dogNamesArr: string[] = [];
      res.data.map((dogObj, index) => {
        if (dogNamesArr.includes(dogObj.breeds[0].name) === false && dogNamesArr.length < 5) {
          return dogNamesArr.push(dogObj.breeds[0].name);
        }
      });
      console.log(res.data[0].breeds[0].name);
      shuffleArray(dogNamesArr);
      setNamesArr(dogNamesArr);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      handleClick();
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <h1>Guess that Dog!</h1>
      {/* <button onClick={handleClick}>Give me a dog</button> */}

      <div style={{ height: "40%", width: "auto" }}>
        <img style={{ height: "250px", objectFit: "contain" }} src={randomImg} alt="" />
      </div>
      <div>
        {namesArr.length > 0 ? namesArr.map((name) => <button>{name}</button>) : "Loading..."}
      </div>
    </>
  );
}
