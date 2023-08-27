import { directoryMenuAtom } from "@/atoms/directoryMenuAtom";
import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

const CreateSomething: React.FC = () => {
  const setDirectoryMenuState = useSetRecoilState(directoryMenuAtom);

  return (
    <Flex direction="column" bg="white" borderRadius={4} overflow="hidden">
      <Box
        height="30px"
        w="full"
        bgImage="images/redditPersonalHome.png"
        backgroundSize="cover"
      />
      <Flex direction="column" p={3}>
        <Flex align="center" gap={2}>
          <Icon as={FaReddit} w={8} h={8} color="brand.100" />
          <Text fontWeight={600} fontSize="11pt">
            Home
          </Text>
        </Flex>
        <Text fontSize="10pt">
          Your personnal reddit home page, built for you
        </Text>
        <Stack mt={3}>
          <Button
            size="xs"
            onClick={() =>
              setDirectoryMenuState((prev) => ({
                ...prev,
                menuOpen: true,
              }))
            }
          >
            Create Post
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={() =>
              setDirectoryMenuState((prev) => ({
                ...prev,
                createCommunityOpen: true,
              }))
            }
          >
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
export default CreateSomething;
