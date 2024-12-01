import { SideBar } from "@/components/sidebar";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { ChangeEvent, useState } from "react";

interface HaircutItem {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
}

interface SubscriptionItem {
  id: string;
  status: string;
}

interface EditHaircutProps {
  haircut: HaircutItem;
  subscription: SubscriptionItem;
}

export default function EditHaircut({
  subscription,
  haircut,
}: EditHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [name, setName] = useState(haircut?.name);
  const [price, setPrice] = useState(haircut?.price);
  const [status, setStatus] = useState(haircut?.status);
  const [disableHaircut, setDisableHaircut] = useState(
    haircut?.status ? "disabled" : "enabled"
  );
  async function handleEdit() {
    if (name === "" || price === "") return;
    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/haircuts", {
        name,
        price: Number(price),
        status,
        haircut_id: haircut?.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeStatus(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");
      setStatus(false);
    } else {
      setDisableHaircut("disabled");
      setStatus(true);
    }
  }
  return (
    <>
      <Head>
        <title>Edit Haircut - BarberPRO</title>
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
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                bg="gray.700"
                _hover={{
                  background: "gray.700",
                }}
                color="white"
                display="flex"
                mr={4}
              >
                <FiChevronLeft size={24} color="#FFF" />
                Back
              </Button>
            </Link>
            <Heading color="white" fontSize={isMobile ? "22px" : "3xl"}>
              Edit haircute
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            mt={4}
            pt={8}
            pb={8}
            w="100%"
            bg="barber.400"
            direction="column"
            align="center"
            justify="center"
          >
            <Heading color="white" fontSize={isMobile ? "22px" : "3xl"} mb={4}>
              Edit haircut
            </Heading>
            <Flex w="85%" direction="column">
              <Input
                placeholder="Name of haircut"
                bg="gray.900"
                mb={3}
                size="lg"
                type="text"
                w="100%"
                color="white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Name of price ex. 45.90"
                bg="gray.900"
                mb={3}
                size="lg"
                type="number"
                w="100%"
                color="white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <Stack mb={6} align="center" direction="row">
                <Text color="white">Disable</Text>
                <Switch
                  size="lg"
                  colorScheme="red"
                  value={disableHaircut}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeStatus(e)
                  }
                  isChecked={disableHaircut === "disabled" ? false : true}
                />
              </Stack>
              <Button
                w="100%"
                color="gray.900"
                mb={6}
                bg="button.cta"
                _hover={{ bg: "#FFb13c" }}
                disabled={subscription.status !== "active"}
                onClick={handleEdit}
              >
                Edit
              </Button>

              {subscription?.status !== "active" && (
                <Flex direction="row" align="center" justify="center">
                  <Link href="/plans">
                    <Text
                      color="#31fb6a"
                      cursor="pointer"
                      fontWeight="bold"
                      mr={1}
                    >
                      Get Premium
                    </Text>
                  </Link>
                  <Text color="white">and get full access</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </SideBar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;
  try {
    const apiClient = setupAPIClient(ctx);
    const check = await apiClient.get("/haircut/check");
    const response = await apiClient.get("/haircut/detail", {
      params: {
        haircut_id: id,
      },
    });

    return {
      props: {
        haircut: response.data,
        subscription: check.data?.subscriptions,
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
