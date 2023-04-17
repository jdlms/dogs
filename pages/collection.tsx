/* eslint-disable react-hooks/exhaustive-deps */
import { CollectionImg } from "@/components/CollectionImg";
import { Loader } from "@/components/Loader";
import { ModalDetailsCollection } from "@/components/ModalDetailsCollection";
import { PageTitle } from "@/components/PageTitle";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Dog } from "@/interfaces/dog";
import { player } from "@/lib/player";
import { useState } from "react";

export default function Collection() {
  const [playerData] = useLocalStorage("guess-that-dog", player);
  const [modalText, setModalText] = useState<Dog | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const collection = playerData.correctBreedIds;
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
      <PageTitle />

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
              justifyContent: "space-around",
              padding: 0,
            }}
          >
            {collection.length > 0 ? (
              collection.map((dog: Dog) => {
                return <CollectionImg key={dog.id} dog={dog} handleClick={handleClick} />;
              })
            ) : collection.length >= 1 ? (
              <Loader />
            ) : (
              <h2>You haven&apos;t collected any dogs yet. Woof!</h2>
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
