import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  Link as ChakraLink,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { SideBar } from "@/components/sidebar";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";
import { setupAPIClient } from "@/services/api";
import { useState } from "react";
import ModalInfo from "@/components/sidebar/modal";
import { api } from "@/services/apiClient";
import { li } from "framer-motion/client";

export interface ScheduleItem {
  map(
    arg0: (item: any) => import("react").JSX.Element
  ): import("react").ReactNode;
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: number | number;
    status: boolean;
    user_id: string;
  };
}

interface DashboardProps {
  schedule: ScheduleItem;
}

export default function Dashboard({ schedule }: DashboardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [list, setList] = useState(schedule);
  const [service, setService] = useState<ScheduleItem>();

  function handleOpenModal(item: ScheduleItem) {
    setService(item);
    onOpen();
  }

  async function handleFinish(id: string) {
    try {
      const apiClient = setupAPIClient();
      await apiClient.delete("/schedule", {
        params: {
          schedule_id: id,
        },
      });

      const filterItem = list.filter((item) => {
        return item?.id !== id;
      });
      setList(filterItem);
      onClose();
    } catch (error) {
      console.error(error);
      onClose();
    }
  }

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
            <Link href="/calendar/new">
              <Button color="white" bg="barber.400">
                New
              </Button>
            </Link>
          </Flex>

          {list.map((item) => (
            <ChakraLink
              onClick={() => handleOpenModal(item)}
              key={item?.id}
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
                mb={2}
                direction={isMobile ? "column" : "row"}
                bg="barber.400"
                justifyContent="space-between"
                align={isMobile ? "flex-start" : "center"}
              >
                <Flex direction="row" mb={isMobile ? 2 : 0}>
                  <IoMdPerson size={28} color="#fba931" />
                  <Text color="white" fontWeight="bold" ml={4} noOfLines={2}>
                    {item?.customer}
                  </Text>
                </Flex>
                <Text color="white" fontWeight="bold" mb={isMobile ? 2 : 0}>
                  {item?.haircut?.name}
                </Text>
                <Text color="white" fontWeight="bold" mb={isMobile ? 2 : 0}>
                  ${item?.haircut?.price}
                </Text>
              </Flex>
            </ChakraLink>
          ))}
        </Flex>
      </SideBar>
      <ModalInfo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={service}
        finishService={() => handleFinish(service?.id)}
      />
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/schedule");

    return {
      props: {
        schedule: response.data,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        schedule: [],
      },
    };
  }
});
