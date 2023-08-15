import { theme } from "@/chakra/theme";
import Layout from "@/components/Layout/Layout";
import {
  ChakraProvider,
  ToastOptions,
  ToastProviderProps,
} from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

const toastOptions: ToastProviderProps = {
  defaultOptions: {
    position: "bottom-right",
    isClosable: true,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme} toastOptions={toastOptions}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
