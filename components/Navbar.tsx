import Link from "next/link";

export function Navbar() {
  return (
    <>
      <nav
        style={{
          borderBottom: "1px solid white",
          paddingBottom: ".3rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
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
              fontSize: "1.5rem",
              fontWeight: "600",
              marginLeft: ".5rem",
              display: "inline-block",
            }}
          >
            <Link href="/">🐶</Link>
          </span>
        </div>
        <div
          style={{
            marginRight: "1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "19rem",
          }}
        >
          <div
            style={{
              display: "inline",
              fontSize: ".9rem",
              borderRight: "1px solid white",
              paddingRight: ".5rem",
            }}
          >
            <Link href="breeds">breeds</Link>
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
