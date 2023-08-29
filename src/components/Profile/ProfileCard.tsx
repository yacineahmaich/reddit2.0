import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BiSolidTShirt } from "react-icons/bi";
import Avatar from "../ui/Avatar";

type ProfileCardProps = {};

const ProfileCard: React.FC<ProfileCardProps> = () => {
  return (
    <Flex
      direction="column"
      bg="white"
      p={2}
      borderRadius={4}
      overflow="hidden"
      border="1px solid"
      borderColor="gray.300"
      position="sticky"
      top="14px"
    >
      <Flex direction="column" align="center" mx={-2} mt={-2}>
        <Box h="80px" w="full" bg="blue.400"></Box>
        <Box mt={-10} border="4px solid white" rounded="full">
          <Avatar alt="profile" size={20} />
        </Box>
      </Flex>
      <Flex direction="column" align="center">
        <Text fontSize="16  pt" fontWeight={600}>
          Yacine
        </Text>
        <Text fontSize="10pt" color="gray.500">
          u/yacine
        </Text>
      </Flex>
      <Button size="sm" mt={3} variant="brand" leftIcon={<BiSolidTShirt />}>
        Update Profile
      </Button>
      {/* <Button size="sm" mt={3} variant="outline">
        New Post
      </Button> */}
    </Flex>
  );
};
export default ProfileCard;
