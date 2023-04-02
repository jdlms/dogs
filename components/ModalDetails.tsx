import { useScoreContext } from "@/context/score";
import { Dog } from "@/interfaces/dog";
import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Score } from "./Score";

export type ModalDetailsProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  modalText: Dog;
  isGuessCorrect?: boolean;
  setIsGuessCorrect?: Dispatch<SetStateAction<boolean>>;
  component?: string;
};

export function ModalDetails({
  isModalOpen,
  setIsModalOpen,
  modalText,
  isGuessCorrect,
  setIsGuessCorrect,
  component,
}: ModalDetailsProps) {
  const handleCancel = () => {
    setIsModalOpen(false);
    if (setIsGuessCorrect) {
      setIsGuessCorrect(false);
    }
  };

  const scoreObj = useScoreContext();
  const correctDog = modalText.breeds[0];

  const temperament = correctDog.temperament.replace(/\b\w/g, (match: string) =>
    match.toLowerCase()
  );
  // #todo not all dogs have bred_for
  let bredFor = "";
  if (correctDog.bred_for) {
    bredFor = correctDog.bred_for.replace(/\b\w/g, (match: string) => match.toLowerCase());
  }
  return (
    <>
      {component ? (
        <Modal title={correctDog.name} open={isModalOpen} onCancel={handleCancel} footer={null}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p>
              The {correctDog.name} is known to be {temperament} and was bred for {bredFor}. They
              typically live for {correctDog.life_span}, have a height of{" "}
              {correctDog.height.imperial} inches and weight {correctDog.weight.imperial} pounds.
            </p>
          </div>
        </Modal>
      ) : (
        <Modal
          title={isGuessCorrect ? "✔️" : "❌"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p>
              The <span style={{ fontWeight: "bold" }}>{correctDog.name}</span> is known to be{" "}
              {temperament} {bredFor ? `and was bred for ${bredFor}.` : "."} They typically live for{" "}
              {correctDog.life_span}, have a height of {correctDog.height.imperial} inches and
              weight {correctDog.weight.imperial} pounds.
            </p>
            <Score score={scoreObj.score} attempts={scoreObj.attempts} />
          </div>
        </Modal>
      )}
    </>
  );
}

// The NAME is known to be TEMPERMENT and was bred for BRED_FOR. They usually have a high of HEIGHT.IMPERIAL inches, weigh WEIGHT.IMPERIAL and live for LIFE-SPAN.

// bred_for: "Hauling heavy freight, Sled pulling"
// ​
// breed_group: "Working"
// ​
// height: Object { imperial: "23 - 25", metric: "58 - 64" }
// ​
// id: 9
// ​
// life_span: "12 - 15 years"
// ​
// name: "Alaskan Malamute"
// ​
// reference_image_id: "dW5UucTIW"
// ​
// temperament: "Friendly, Affectionate, Devoted, Loyal, Dignified, Playful"
// ​
// weight: Object { imperial: "65 - 100", metric: "29 - 45" }
