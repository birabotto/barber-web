import { Flex, Text, Heading, Box, Input, Button } from "@chakra-ui/react";

import Head from "next/head";
import { SideBar } from "@/components/sidebar";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { setupAPIClient } from "@/services/api";

interface UserProps {
  id: string;
  name: string;
  email: string;
  address: string | null;
}

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {
  const [name, setName] = useState(user && user?.name);
  const [address, setAddress] = useState(user && user?.address);

  const { logoutUser } = useContext(AuthContext);
  async function handleLogout() {
    await logoutUser();
  }

  async function handleUpdateUser() {
    if (name === "") return;

    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/users", {
        name,
        address,
      });
      alert("User was updated");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Head>
        <title>My Profile - BarberPRO</title>
      </Head>
      <SideBar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            w="100%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Heading color="orange.900" fontSize="3xl" mt={4} mb={4} mr={4}>
              My profile
            </Heading>
          </Flex>
          <Flex
            pt={8}
            pb={8}
            background="barber.400"
            maxH="700px"
            w="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column" w="85%">
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Name of Barber
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Name of your barber"
                size="lg"
                type="text"
                mb={3}
                color="white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Address of Barber
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Address of your barber"
                size="lg"
                type="text"
                color="white"
                mb={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Current plan
              </Text>
              <Flex
                direction="row"
                w="100%"
                mb={3}
                p={1}
                borderWidth={1}
                rounded={6}
                background="barber.900"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  color={premium ? "#FBA931" : "#44ffb4"}
                  p={2}
                  fontSize="lg"
                >
                  {}
                  {premium ? "Premium" : "Free"} plan
                </Text>
                <Link href="/plans">
                  <Box
                    color="white"
                    cursor="pointer"
                    p={1}
                    pl={2}
                    pr={2}
                    background="#00cd52"
                    rounded={4}
                  >
                    Change of plan
                  </Box>
                </Link>
              </Flex>

              <Button
                w="100%"
                mt={3}
                mb={4}
                bg="button.cta"
                _hover={{ bg: "#ffb13e" }}
                onClick={handleUpdateUser}
              >
                Save
              </Button>
              <Button
                w="100%"
                mb={6}
                bg="transparent"
                borderWidth={2}
                borderColor="red.500"
                color="red.500"
                size="lg"
                _hover={{ bg: "transparent" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
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

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      address: response.data?.address,
    };

    return {
      props: {
        user,
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
