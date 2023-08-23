import { theme } from "@/chakra/theme";
import Layout from "@/components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ChakraProvider, ToastProviderProps } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import GlobalLoader from "nextjs-toploader";

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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider theme={theme} toastOptions={toastOptions}>
          <GlobalLoader showSpinner={false} />
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </ChakraProvider>
      </RecoilRoot>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
