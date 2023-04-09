/* eslint-disable react-hooks/exhaustive-deps */
import { CollectionImg } from "@/components/CollectionImg";
import { Loader } from "@/components/Loader";
import { ModalDetailsCollection } from "@/components/ModalDetailsCollection";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Dog } from "@/interfaces/dog";
import { player } from "@/lib/player";
import Image from "next/image";
import { useState } from "react";

export default function Collection() {
  const [playerData, setPlayerData] = useLocalStorage("guess-that-dog", player);
  const [modalText, setModalText] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  let collection = playerData.correctBreedIds;
  const component = "collection";

  const handleClick = (dog: Dog) => {
    setModalText(dog);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "4rem",
      }}
    >
      {!isModalOpen ? (
        <div>
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
                return <CollectionImg key={dog.id} dog={dog} handleClick={handleClick} />;
              })
            ) : (
              <Loader />
            )}
          </ul>
        </div>
      ) : (
        <>
          <ModalDetailsCollection
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            modalText={modalText}
            component={component}
          />
        </>
      )}
    </div>
  );
}
