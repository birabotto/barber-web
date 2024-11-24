import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};
const theme = extendTheme({
  config,
  colors: {
    barber: {
      900: "#12131b",
      400: "#1b1c29",
      100: "#c6c6c6",
    },
    button: {
      cta: "#fba931",
      default: "#FFF",
      gray: "#dfdfdf",
      danger: "#ff4040",
    },
    orange: {
      900: "#fba931",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
