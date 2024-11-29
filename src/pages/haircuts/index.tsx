import Head from "next/head";
import { setupAPIClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import {
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Switch,
  useMediaQuery,
} from "@chakra-ui/react";

import Link from "next/link";

import { IoMdPricetag } from "react-icons/io";
import { SideBar } from "@/components/sidebar";
import { useState, ChangeEvent } from "react";

interface HaircutsItem {
  id: string;
  name: string;
  price: number | number;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [haircutsList, setHaircutsList] = useState<HaircutsItem[]>(
    haircuts || []
  );
  const [disableHaircut, setDisableHaircut] = useState("enabled");

  async function handleDisabled(e: ChangeEvent<HTMLInputElement>) {
    const apiClient = setupAPIClient();

    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");
      const response = await apiClient.get("/haircuts", {
        params: {
          status: true,
        },
      });

      setHaircutsList(response.data);
    } else {
      setDisableHaircut("disabled");
      const response = await apiClient.get("/haircuts", {
        params: {
          status: false,
        },
      });

      setHaircutsList(response.data);
    }
  }

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
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
            mb={0}
          >
            <Heading
              fontSize={isMobile ? "28px" : "3xl"}
              mt={4}
              mb={4}
              mr={4}
              color="orange.900"
            >
              Types de corte
            </Heading>

            <Link href="/haircuts/new">
              <Button>New Haircut</Button>
            </Link>

            <Stack ml="auto" align="center" direction="row">
              <Text fontWeight="bold">ATIVOS</Text>
              <Switch
                colorScheme="green"
                size="lg"
                value={disableHaircut}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleDisabled(e)
                }
                isChecked={disableHaircut === "disabled" ? false : true}
              />
            </Stack>
          </Flex>
          {haircutsList.map((haircut) => (
            <Link key={haircut.id} href={`/haircuts/${haircut.id}`}>
              <Flex
                cursor="pointer"
                w="100%"
                p={4}
                bg="barber.400"
                direction={isMobile ? "column" : "row"}
                alignItems={isMobile ? "flex-start" : "center"}
                rounded="4"
                mb={2}
                justifyContent="space-between"
              >
                <Flex
                  mb={isMobile ? 2 : 0}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IoMdPricetag size={28} color="#fba931" />
                  <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                    {haircut.name}
                  </Text>
                </Flex>

                <Text fontWeight="bold" color="white">
                  Price: ${haircut.price}
                </Text>
              </Flex>
            </Link>
          ))}
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
