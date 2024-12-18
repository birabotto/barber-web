import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FiUser, FiScissors } from "react-icons/fi";

import { ScheduleItem } from "@/pages/dashboard";

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finishService: () => Promise<void>;
}

export default function ModalInfo({
  isOpen,
  onOpen,
  onClose,
  data,
  finishService,
}: ModalInfoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="barber.400">
        <ModalHeader color="white">Next</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Flex align="center" mb={3}>
            <FiUser size={28} color="#FFB13e" />
            <Text color="white" ml={3} fontSize="large" fontWeight="bold">
              {data?.customer}
            </Text>
          </Flex>
          <Flex align="center" mb={3}>
            <FiScissors size={28} color="#FFF" />
            <Text color="white" ml={3} fontSize="large" fontWeight="bold">
              {data?.haircut?.name}
            </Text>
          </Flex>
          <Flex align="center" mb={3}>
            <FaMoneyBillAlt size={28} color="#46EF75" />
            <Text color="white" ml={3} fontSize="large" fontWeight="bold">
              $ {data?.haircut?.price}
            </Text>
          </Flex>

          <ModalFooter>
            <Button
              bg="button.cta"
              _hover={{
                bg: "#FFb13e",
              }}
              color="white"
              mr={3}
              onClick={() => finishService()}
            >
              Finish calendar
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
