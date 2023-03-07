import Link from "next/link";

export default function Home() {
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
