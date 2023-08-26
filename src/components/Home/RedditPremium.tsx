import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { MdOutlineSecurity } from "react-icons/md";

const RedditPremium: React.FC = () => {
  return (
    <Flex bg="white" direction="column" p={3} gap={3} borderRadius={4}>
      <Flex gap={2}>
        <Icon as={MdOutlineSecurity} fontSize="24pt" color="brand.100" />
        <Flex direction="column" gap={2}>
          <Text fontWeight={600} fontSize="11pt">
            Reddit Premium
          </Text>
          <Text fontSize="10pt">
            The best Reddit experience, With mointhly coins.
          </Text>
        </Flex>
      </Flex>
      <Button size="xs" bg="brand.100" _hover={{ bg: "brand.100" }}>
        Try Now
      </Button>
    </Flex>
  );
};
export default RedditPremium;
