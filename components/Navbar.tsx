import Link from "next/link";

export function Navbar() {
  return (
    <>
      <nav
        style={{
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
              fontSize: "2.5rem",
              fontWeight: "600",
              marginLeft: ".5rem",
              marginTop: '.5rem',
              display: "inline-block",
              transform: "rotate(1deg)",
              
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
          }}
          >
          <div
            style={{
              display: "inline",
              fontSize: ".9rem",
              border: "1px solid white",
              background: "white",
              padding: ".5rem",
              borderRadius: "4%",
              color: "#1c1b22",
              fontWeight: "bold",
              margin: "1rem",
            }}
          >
            <Link href="/name">name</Link>
          </div>
          <div
            style={{
              display: "inline",
              fontSize: ".9rem",
              border: "1px solid white",
              background: "white",
              padding: ".5rem",
              borderRadius: "4%",
              color: "#1c1b22",
              fontWeight: "bold",
              margin: "1rem",
            }}
          >
            <Link href="/photo">photo</Link>
          </div>
          <div
            style={{
              display: "inline",
              fontSize: ".9rem",
              border: "1px solid white",
              background: "white",
              padding: ".5rem",
              borderRadius: "4%",
              color: "#1c1b22",
              fontWeight: "bold",
              margin: "1rem",
            }}
          >
            <Link href="/collection">collection</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
