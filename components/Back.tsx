export function Back({ setDisplayName, setDisplayPhoto }) {
  const handleClick = () => {
    setDisplayName(false);
    setDisplayPhoto(false);
  };

  return (
    <>
      <span style={{ fontSize: "2rem", cursor: "pointer" }} onClick={handleClick}>
        ⬅
      </span>
    </>
  );
}
