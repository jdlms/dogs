import { Navbar } from "./Navbar";

export function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
