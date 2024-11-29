import { SideBar } from "@/components/sidebar";
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

export default function EditHaircut() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
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
              <Button bg="barber.400" color="white" display="flex" mr={4}>
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
              />
              <Input
                placeholder="Name of price ex. 45.90"
                bg="gray.900"
                mb={3}
                size="lg"
                type="number"
                w="100%"
                color="white"
              />

              <Stack mb={6} align="center" direction="row">
                <Text color="white">Disable</Text>
                <Switch size="lg" colorScheme="red" />
              </Stack>
              <Button
                w="100%"
                color="gray.900"
                mb={6}
                bg="button.cta"
                _hover={{ bg: "#FFb13c" }}
              >
                Edit
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </SideBar>
    </>
  );
}
