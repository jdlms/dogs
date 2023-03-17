import { Layout } from "@/components/Layout";
import ScoreWrapper from "@/context/score";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ScoreWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ScoreWrapper>
  );
}
