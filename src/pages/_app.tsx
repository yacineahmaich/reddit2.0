import { theme } from "@/chakra/theme";
import Layout from "@/components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, ToastProviderProps } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

const toastOptions: ToastProviderProps = {
  defaultOptions: {
    position: "bottom-right",
    isClosable: true,
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider theme={theme} toastOptions={toastOptions}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
