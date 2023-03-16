import { Back } from "@/components/Back";
import Name from "@/components/Name";
import Photo from "@/components/Photo";
import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const [displayName, setDisplayName] = useState(false);
  const [displayPhoto, setDisplayPhoto] = useState(false);

  const handleNameClick = () => setDisplayName(!displayName);
  const handlePhotoClick = () => setDisplayPhoto(!displayPhoto);

  return (
    <>
      {!displayName && !displayPhoto ? (
        <>
          <button onClick={handleNameClick}>By name</button>
          <button onClick={handlePhotoClick}>By photo</button>
        </>
      ) : null}

      <div>You've learned X breeds and your current score is X</div>
<p>five guesses per day for each mode, practice your dog knowledge. Three correct answers adds the dog to your collection</p>
      {displayName ? (
        <Name score={score} setScore={setScore} attempts={attempts} setAttempts={setAttempts} />
      ) : null}

      {displayPhoto ? (
        <Photo score={score} setScore={setScore} attempts={attempts} setAttempts={setAttempts} />
      ) : null}

      {displayName || displayPhoto ? (
        <Back
          setDisplayName={setDisplayName}
          setDisplayPhoto={setDisplayPhoto}
          setScore={setScore}
          setAttempts={setAttempts}
        />
      ) : null}
    </>
  );
}
