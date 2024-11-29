import { SideBar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

interface NewHaircutProps {
  subscriptions: boolean;
  count: number;
}

export default function NewHaircut({ subscriptions, count }: NewHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <Head>
        <title>BarberPRO - New haircut</title>
      </Head>
      <SideBar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button bg="barber.400" color="white" display="flex" mr={4}>
                <FiChevronLeft size={24} color="#FFF" />
                Back
              </Button>
            </Link>
            <Heading
              color="orange.900"
              mt={4}
              mb={4}
              mr={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Types of haircuts
            </Heading>
          </Flex>

          <Flex
            direction="column"
            maxW="700px"
            bg="barber.400"
            w="100%"
            alignItems="center"
            justify="center"
            pt={8}
            pb={8}
          >
            <Heading color="white" fontSize={isMobile ? "22px" : "3xl"} mb={4}>
              Types of haircuts
            </Heading>
            <Input
              placeholder="Name of haircut"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900"
              mb={3}
              disabled={!subscriptions && count >= 3}
            />

            <Input
              placeholder="Price of haircut ex. 59.00"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900"
              mb={4}
              disabled={!subscriptions && count >= 3}
            />

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              mb={6}
              bg="button.cta"
              _hover={{ bg: "#FFb13c" }}
              disabled={!subscriptions && count >= 3}
            >
              New
            </Button>

            {!subscriptions && count >= 3 && (
              <Flex direction="row" align="center" justifyContent="center">
                <Text color="white">You have reached your haircute limit</Text>
                <Link href="/plans">
                  <Text
                    color="#31FB6A"
                    fontWeight="bold"
                    cursor="pointer"
                    ml={1}
                  >
                    Get premium
                  </Text>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </SideBar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/haircut/check");
    const count = await apiClient.get("/haircute/count");

    return {
      props: {
        subscriptions:
          response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});