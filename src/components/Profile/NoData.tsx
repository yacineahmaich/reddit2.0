import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { PiRedditLogo } from "react-icons/pi";

type NoDataProps = {
  message: string;
};

const NoData: React.FC<NoDataProps> = ({ message }) => {
  return (
    <Flex
      justify="center"
      align="center"
      minH="200px"
      bg="white"
      borderRadius={4}
      direction="column"
      gap={2}
    >
      <Icon as={PiRedditLogo} fontSize="40pt" color="gray.400" />
      <Text fontSize="11pt" maxW="sm" textAlign="center" fontWeight={600} color="gray.400">Hmmm! {message}</Text>
    </Flex>
  );
};
export default NoData;
