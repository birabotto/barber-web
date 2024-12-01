import { SideBar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";

interface PlansProps {
  premium: boolean;
}

export default function Plans({ premium }: PlansProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <Head>
        <title>BarberPRO - Plan Premium</title>
      </Head>
      <SideBar>
        <Flex w="100%" direction="row" align="flex-start" justify="flex-start">
          <Heading color="white" fontSize="3xl" mt={4} mb={4} mr={4}>
            Plans
          </Heading>
        </Flex>

        <Flex
          pb={8}
          maxH="780px"
          w="100%"
          direction="column"
          align="flex-start"
          justify="flex-start"
        >
          <Flex w="100%" gap={4} direction={isMobile ? "column" : "row"}>
            <Flex rounded={4} p={2} flex={1} bg="barber.400" direction="column">
              <Heading
                textAlign="center"
                fontSize="2xl"
                mt={2}
                mb={4}
                color="gray.100"
              >
                Premium
              </Heading>
              <Text fontWeight="medium" color="white" ml={4} mb={2}>
                Register haircuts.
              </Text>
              <Text fontWeight="medium" color="white" ml={4} mb={2}>
                Create only 3 model of haircut.
              </Text>
              <Text fontWeight="medium" color="white" ml={4} mb={2}>
                Edit perfil.
              </Text>
            </Flex>
            <Flex rounded={4} p={2} flex={1} bg="barber.400" direction="column">
              <Heading
                textAlign="center"
                fontSize="2xl"
                mt={2}
                mb={4}
                color="#31FB6a"
              >
                Free Plan
              </Heading>
              <Text fontWeight="medium" color="white" ml={4} mb={2}>
                Register haircuts unlimited.
              </Text>
              <Text fontWeight="medium" color="white" ml={4} mb={2}>
                Create unlimited model of haircut.
              </Text>
              <Text fontWeight="medium" color="white" ml={4} mb={2}>
                Edit model of haricut.
              </Text>
              <Text fontWeight="medium" color="white" ml={4} mb={2}>
                Edit perfil.
              </Text>
              <Text fontWeight="medium" color="white" ml={4} mb={2}>
                Get full updates.
              </Text>
              <Text fontWeight="bold" size="2xl" color="#31FB6a" ml={4} mb={2}>
                $ 9.99
              </Text>
              <Button
                bg={premium ? "transparent" : "button.cta"}
                m={2}
                disabled={premium}
                color="white"
                onClick={() => {}}
              >
                {premium ? "You are premium" : "Get Premium"}
              </Button>

              {premium && (
                <Button
                  m={2}
                  bg="white"
                  color="barber.900"
                  fontWeight="bold"
                  onClick={() => {}}
                >
                  Change plan
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </SideBar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    return {
      props: {
        premiumn:
          response.data?.subscriptions?.status === "active" ? true : false,
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
