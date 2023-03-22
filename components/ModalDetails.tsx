import { Modal } from "antd";

export function ModalDetails({ isModalOpen, setIsModalOpen, correctName }) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(correctName);

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>
          The {correctName.breeds[0].name} is known to be {correctName.breeds[0].temperament} and was
          bred for
          {correctName.breeds[0].bred_for}
        </p>
      </Modal>
    </>
  );
}

// The NAME is known to be TEMPERMENT and was bred for BRED_FOR. They usually have a high of HEIGHT.IMPERIAL inches, weigh WEIGHT.IMPERIAL and live for LIFE-SPAN.
