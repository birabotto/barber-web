import { SideBar } from "@/components/sidebar";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Flex, Heading, Text, Button, Input, Select } from "@chakra-ui/react";
import Head from "next/head";
import Router from "next/router";
import { ChangeEvent, useState } from "react";

interface HaircutsProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutsProps[];
}

export default function New({ haircuts }: NewProps) {
  const [customer, setCustomer] = useState("");
  const [haircutSeleted, setHaircutSeleted] = useState(haircuts[0]);

  function handleChangeSelect(id: string) {
    const haircutItem = haircuts.find((item) => item.id === id);
    setHaircutSeleted(haircutItem);
  }

  async function handleNew() {
    if (customer === "") return;
    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/schedule", {
        customer,
        haircut_id: haircutSeleted?.id,
      });
      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert("ERROR register");
    }
  }

  return (
    <>
      <Head>
        <title>BarberPRO - New Calendar</title>
      </Head>
      <SideBar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex direction="row" w="100%" align="center" justify="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} marginTop={4} color="white">
              New Calendar
            </Heading>
          </Flex>
          <Flex
            maxW="700px"
            pt={8}
            pb={8}
            width="100%"
            direction="column"
            align="center"
            justify="center"
            bg="barber.400"
          >
            <Input
              placeholder="Name of client"
              w="85%"
              color="white"
              mb={3}
              size="lg"
              type="text"
              bg="barber.900"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <Select
              m={3}
              size="lg"
              w="85%"
              color="white"
              bg="barber.900"
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeSelect(e.target.value)
              }
            >
              {haircuts?.map((haircut) => (
                <option key={haircut.id} value={haircut?.id}>
                  {haircut?.name}
                </option>
              ))}
            </Select>

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{
                bg: "#ffb13e",
              }}
              onClick={handleNew}
            >
              New
            </Button>
          </Flex>
        </Flex>
      </SideBar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });
    console.log(response.data);
    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }
    return {
      props: {
        haircuts: response.data,
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
