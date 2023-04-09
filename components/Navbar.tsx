import Link from "next/link";
import styled from "styled-components";

export const NavLinkWrapper = styled.div`
  display: inline;
  font-size: 0.9rem;
  border: 1px solid #d3a3ac;
  background: #c0413b;
  padding: 0.5rem;
  border-radius: 4%;
  color: #c5c5c5;
  font-weight: bold;
  margin: 1rem;
`;

export function Navbar() {
  return (
    <>
      <nav
        style={{
          borderBottom: "2px solid #d3a3ac",

          paddingBottom: ".2rem",
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
              marginTop: ".5rem",
              display: "inline-block",
              transform: "rotate(1deg)",
            }}
          >
            <Link href="/">🐶</Link>
          </span>
          <Link href="/">
            <h1 style={{ display: "inline", fontSize: "220%", marginLeft: "1rem" }}>
              Guess that dog!
            </h1>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Link href="/name">
            <NavLinkWrapper>name</NavLinkWrapper>
          </Link>

          <Link href="/photo">
            <NavLinkWrapper>photo</NavLinkWrapper>
          </Link>

          <Link href="/collection">
            <NavLinkWrapper>collection</NavLinkWrapper>
          </Link>
        </div>
      </nav>
    </>
  );
}
