import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
      // height: "28px",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "blue.500",
      _hover: {
        bg: "blue.400",
      },
      _disabled: {
        pointerEvents: "none",
      },
    },
    danger: {
      color: "white",
      bg: "red.400",
      _hover: {
        bg: "red.300",
      },
      _disabled: {
        pointerEvents: "none",
      },
    },
    brand: {
      color: "white",
      bgGradient: "linear-gradient(to right, brand.100, orange.300)",
      _hover: {
        bgGradient: "linear-gradient(to right, brand.100, orange.300)",
      },
      _disabled: {
        pointerEvents: "none",
      },
    },
    outline: {
      color: "blue.500",
      border: "1px solid",
      borderColor: "blue.500",
      _disabled: {
        pointerEvents: "none",
      },
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.50",
      },
      _disabled: {
        pointerEvents: "none",
      },
    },
  },
};
