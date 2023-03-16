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
          >
            {/* Guess that dog */}
          </div>
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginLeft: ".5rem",
              display: "inline-block",
            }}
          >
            🐶
          </span>
        </div>
        <div
          style={{
            marginRight: "1rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "9rem",
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
            by name
          </div>
          <div
            style={{
              display: "inline",
              fontSize: ".9rem",
              paddingLeft: ".5rem",
            }}
          >
            by photo
          </div>
        </div>
      </nav>
    </>
  );
}
