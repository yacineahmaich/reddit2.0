import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

export const theme = extendTheme({
  components: {
    Button,
  },
  colors: {
    brand: {
      100: "#FF3c00",
    },
  },
  fonts: {
    body: "Open sans, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "gray.200",
      },
    },
  },
});
