import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";

import { RootLayout } from "../components/layouts/rootLayout";
import { AuthContextProvider } from "@/contexts/auth-contex";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <RootLayout>
        <ToastContainer />
        <Component {...pageProps} />
      </RootLayout>
    </AuthContextProvider>
  );
}
