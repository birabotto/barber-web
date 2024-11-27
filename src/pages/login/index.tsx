import { useContext, useState } from "react";
import { Center, Flex, Text, Input, Button } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/images/logo.svg";
import Head from "next/head";

import { AuthContext } from "@/context/AuthContext";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Login() {
  const { singIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email == "" || password == "") return;

    await singIn({ email, password });
  }
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
              alt="Logo BarberPRO"
            />
          </Center>
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            mb={3}
          />
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="*******"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb={6}
          />

          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            onClick={handleLogin}
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

export const getServerSideProps = canSSRGuest(async () => {
  return {
    props: {},
  };
});
