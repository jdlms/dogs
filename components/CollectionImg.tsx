import { Dog } from "@/interfaces/dog";
import Image from "next/image";

type collectionImgProps = {
  key: string;
  dog: Dog;
  handleClick: (dog: Dog) => void;
};

export function CollectionImg({ key, dog, handleClick }: collectionImgProps) {
  return (
    <li id={key}>
      <Image
        className="dogPic"
        onClick={() => handleClick(dog)}
        style={{
          // height: "150px",
          objectFit: "fill",
          borderWidth: "2px",
          borderColor: "#f5f5f5",
          borderStyle: "solid",
          cursor: "pointer",
        }}
        src={dog.url}
        alt={"dog"}
        height={150}
        width={200}
      />
    </li>
  );
}
