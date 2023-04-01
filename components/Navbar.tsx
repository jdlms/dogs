import Link from "next/link";

export function Navbar() {
  return (
    <>
      <nav
        style={{
          borderBottom: "2px solid white",
          paddingBottom: ".3rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: "600",
              marginLeft: ".5rem",
              display: "inline",
            }}
          ></div>
          <span
            style={{
              fontSize: "2.5rem",
              fontWeight: "600",
              marginLeft: ".5rem",
              display: "inline-block",
              transform: "rotate(1deg)",
              marginTop: '-5px',
              marginBottom: "-20px",
            }}
          >
            <Link href="/">🐶</Link>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "16rem",
          }}
        >
          <div
            style={{
              display: "inline",
              fontSize: ".9rem",
              borderRight: "1px solid white",
              paddingRight: ".5rem",
              paddingLeft: ".5rem",
            }}
          >
            <Link href="/name">by name</Link>
          </div>
          <div
            style={{
              display: "inline",
              fontSize: ".9rem",
              borderRight: "1px solid white",
              paddingRight: ".5rem",
              paddingLeft: ".5rem",
            }}
          >
            <Link href="/photo">by photo</Link>
          </div>
          <div
            style={{
              display: "inline",
              fontSize: ".9rem",

              paddingRight: ".5rem",
              paddingLeft: ".5rem",
            }}
          >
            <Link href="/collection">collection</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
