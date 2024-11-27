import { Center, Flex, Text, Input, Button } from "@chakra-ui/react";
import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/images/logo.svg";
import Head from "next/head";

import { AuthContext } from "@/context/AuthContext";

import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Register() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleRegister() {
    if (name == "" && email == "" && password == "") return;

    await signUp({
      name,
      email,
      password,
    });
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Register</title>
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
            placeholder="Name of Barber"
            type="name"
            color="white"
            onChange={(e) => setName(e.target.value)}
            value={name}
            mb={3}
          />
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="email@email.com"
            type="email"
            color="white"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            mb={6}
          />

          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="*******"
            type="password"
            color="white"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            mb={6}
          />

          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            onClick={handleRegister}
          >
            Create
          </Button>
          <Center mt={2}>
            <Link href="/login">
              <Text cursor="pointer">
                Have an account? <strong>Click here!</strong>
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
