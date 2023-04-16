import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showTitle = windowWidth >= 720;

  return (
    <>
      <nav
        style={{
          borderBottom: "2px solid #d3a3ac",

          paddingBottom: ".5rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ marginTop: "-5px" }}>
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
          {showTitle && (
            <Link href="/">
              <h1 style={{ display: "inline", fontSize: "220%", marginLeft: "1rem" }}>
                Guess that dog!
              </h1>
            </Link>
          )}
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
