import { Modal } from "antd";

export function ModalDetails({
  isModalOpen,
  setIsModalOpen,
  modalText,
  isGuessCorrect,
  setIsGuessCorrect,
}) {
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsGuessCorrect(false);
  };

  const correctDog = modalText.breeds[0];

  const temperament = correctDog.temperament.replace(/\b\w/g, (match: string) =>
    match.toLowerCase()
  );

  const bredFor = correctDog.bred_for.replace(/\b\w/g, (match: string) => match.toLowerCase());

  return (
    <>
      <Modal
        title={isGuessCorrect ? "✔️" : "❌"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p>
          The {correctDog.name} is known to be {temperament} and was bred for {bredFor}.
        </p>
      </Modal>
    </>
  );
}

// The NAME is known to be TEMPERMENT and was bred for BRED_FOR. They usually have a high of HEIGHT.IMPERIAL inches, weigh WEIGHT.IMPERIAL and live for LIFE-SPAN.
