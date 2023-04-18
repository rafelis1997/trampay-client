import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { RootLayout } from "../components/layouts/rootLayout";
import { AuthContextProvider } from "@/contexts/auth-contex";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </AuthContextProvider>
  );
}
