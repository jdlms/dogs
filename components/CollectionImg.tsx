import Image from "next/image";

export function CollectionImg({ key, dog, handleClick }) {
  return (
    <li key={key}>
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
        alt={dog.breeds[0].name}
        height={150}
        width={200}
      />
    </li>
  );
}
