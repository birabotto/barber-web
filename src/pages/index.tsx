import { Center, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>BarberPRO</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={30} color="barber.100">
          Page Home
        </Text>
      </Flex>
    </>
  );
}
