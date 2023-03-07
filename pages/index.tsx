import { shuffleArray } from "@/lib/shuffle";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
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

  console.log(namesArr);
  return (
    <>
      <h1>Guess that Dog!</h1>
      {/* <button onClick={handleClick}>Give me a dog</button> */}

      <div style={{ height: "50vh", width: "50vw" }}>
        <img
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
          src={randomImg}
          alt=""
        />
      </div>

      <ul>{namesArr.length > 0 ? namesArr.map((name) => <li>{name}</li>) : "Loading..."}</ul>
    </>
  );
}
