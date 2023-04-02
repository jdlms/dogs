/* eslint-disable react-hooks/exhaustive-deps */
import { ModalDetails } from "@/components/ModalDetails";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Dog } from "@/interfaces/dog";
import { player } from "@/lib/player";
import Image from "next/image";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

export default function Collection() {
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);
  const [modalText, setModalText] = useState({});
  const [isModalOpen, setisModalOpen] = useState(false);

  let collection = playerData.correctBreedIds;

  const handleClick = (dog: Dog) => {};

  return (
    <>
      {!isModalOpen ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
              listStyle: "none",
            }}
          >
            {collection.length > 0 ? (
              collection.map((dog: Dog) => {
                return (
                  <li key={dog.id}>
                    <Image
                      className="dogPic"
                      onClick={() => handleClick(dog)}
                      style={{
                        // height: "150px",
                        objectFit: "fill",
                        borderWidth: "2px",
                        borderColor: "white",
                        borderStyle: "solid",
                        cursor: "pointer",
                      }}
                      src={dog.url}
                      alt={dog.breeds[0].name}
                      height={150}
                      width={200}
                    />
                  </li>
                );
              })
            ) : (
              <ScaleLoader color="#ffffff" />
            )}
          </ul>
        </div>
      ) : (
        <>
          <ModalDetails
            isModalOpen={isModalOpen}
            setIsModalOpen={setisModalOpen}
            modalText={modalText}
            // isGuessCorrect={isGuessCorrect}
            // setIsGuessCorrect={setIsGuessCorrect}
          />
        </>
      )}
    </>
  );
}
