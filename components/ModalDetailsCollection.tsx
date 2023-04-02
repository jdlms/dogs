import { ModalDetails, ModalDetailsProps } from "./ModalDetails";

export function ModalDetailsCollection({
  isModalOpen,
  setIsModalOpen,
  modalText,
  component,
}: ModalDetailsProps) {
  return (
    <>
      <ModalDetails
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalText={modalText}
        component={component}
      />
    </>
  );
}

// isModalOpen={isModalOpen}
//             setIsModalOpen={setIsModalOpen}
//             modalText={modalText}
