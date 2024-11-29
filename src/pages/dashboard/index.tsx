import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { SideBar } from "@/components/sidebar";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <Head>
        <title>BarberPRO - my dashboard</title>
      </Head>
      <SideBar>
        <Flex
          background="barber.900"
          direction="column"
          align="flex-start"
          justify="flex-start"
        >
          <Flex w="100%" direction="row" align="center" justify="flex-start">
            <Heading color="white" fontSize="3xl" mt={4} mb={4} mr={4}>
              Calendar
            </Heading>
            <Link href="/new">
              <Button color="white" bg="barber.400">
                New
              </Button>
            </Link>
          </Flex>
          <ChakraLink
            w="100%"
            m={0}
            p={0}
            mt={1}
            bg="transparent"
            style={{ textDecoration: "none" }}
          >
            <Flex
              w="100%"
              p={4}
              rounded={4}
              mb={4}
              direction={isMobile ? "column" : "row"}
              bg="barber.400"
              justifyContent="space-between"
              align={isMobile ? "flex-start" : "center"}
            >
              <Flex direction="row" mb={isMobile ? 2 : 0}>
                <IoMdPerson size={28} color="#fba931" />
                <Text color="white" fontWeight="bold" ml={4} noOfLines={2}>
                  Tibirica Botto
                </Text>
              </Flex>
              <Text color="white" fontWeight="bold" mb={isMobile ? 2 : 0}>
                Spider hurt
              </Text>
              <Text color="white" fontWeight="bold" mb={isMobile ? 2 : 0}>
                $49.99
              </Text>
            </Flex>
          </ChakraLink>
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
