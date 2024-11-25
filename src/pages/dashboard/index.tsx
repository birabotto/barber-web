import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPRO - my dashboard</title>
      </Head>
      <Flex>
        <Text>Wellcome Dashboard</Text>
      </Flex>
    </>
  );
}
