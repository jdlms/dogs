import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [randomImg, setRandomImg] = useState("");

  const handleClick = async function () {
    try {
      let res = await axios.get("/api/getRandomImage");
      if (res.status === 200) {
        setRandomImg(res.data[0].url);
        console.log(res.data.url);
      }
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  return (
    <>
      <h1>Guess that Dog!</h1>
      <button onClick={handleClick}>Give me a dog</button>
      <br />
      <img style={{ height: "40%", width: "auto" }} src={randomImg} alt="" />
    </>
  );
}
