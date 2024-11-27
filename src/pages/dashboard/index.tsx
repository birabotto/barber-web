import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { SideBar } from "@/components/sidebar";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPRO - my dashboard</title>
      </Head>
      <SideBar>
        <Flex background="barber.900" height="100vh">
          <Text fontSize={30} color="barber.100">
            Dashboard
          </Text>
        </Flex>
      </SideBar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async () => {
  return {
    props: {},
  };
});
