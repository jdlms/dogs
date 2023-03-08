import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [score, setscore] = useState(0);
  return (
    <>
      <h1>Guess that Dog!</h1>
      {/* <button onClick={handleClick}>Give me a dog</button> */}

      <Link href={"/by-name"}>
        <button>Guess by name</button>
      </Link>
      <Link href={"/by-photo"}>
        <button>Guess by photo</button>
      </Link>
    </>
  );
}
