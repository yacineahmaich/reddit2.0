import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import Avatar from "../ui/Avatar";
import { getStorageDownloadUrl } from "@/firebase/helpers";

type ProfileCardProps = {};

const ProfileCard: React.FC<ProfileCardProps> = () => {
  const router = useRouter();
  const displayName = router.query.displayName as string;

  const userProfile = getStorageDownloadUrl(`users/${displayName}`);

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
          <Avatar source={userProfile} alt="profile" size={20} />
        </Box>
      </Flex>
      <Flex direction="column" align="center">
        <Text fontSize="16  pt" fontWeight={600}>
          {displayName}
        </Text>
        <Text fontSize="10pt" color="gray.500">
          u/{displayName}
        </Text>
      </Flex>
    </Flex>
  );
};
export default ProfileCard;
