import { Center, Flex, Text, Input, Button } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/images/logo.svg";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>BarberPRO - Login</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image
              src={logoImg}
              width={240}
              quality={100}
              objectFit="fill"
              alt="Logo BarberPRO"
            />
          </Center>
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="email@email.com"
            type="email"
            mb={3}
          />
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="*******"
            type="password"
            mb={6}
          />

          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
          >
            Login
          </Button>
          <Center mt={2}>
            <Link href="/register">
              <Text cursor="pointer">
                Dont have an account? <strong>Create one!</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
