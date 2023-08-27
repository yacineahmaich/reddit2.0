import { authModalAtom } from "@/atoms/authModalAtom";
import { directoryMenuAtom } from "@/atoms/directoryMenuAtom";
import { auth } from "@/firebase/client";
import { Box, Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

const CreateSomething: React.FC = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const setDirectoryMenuState = useSetRecoilState(directoryMenuAtom);

  const openDirectoryMenu = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
    }
    setDirectoryMenuState((prev) => ({
      ...prev,
      menuOpen: true,
    }));
    window.scrollTo({ top: 0, left: 0 });
  };

  const openCreateCommunityModal = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
    }
    setDirectoryMenuState((prev) => ({
      ...prev,
      createCommunityOpen: true,
    }));
  };

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
          <Button size="xs" onClick={openDirectoryMenu}>
            Create Post
          </Button>
          <Button
            size="xs"
            variant="outline"
            onClick={openCreateCommunityModal}
          >
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
export default CreateSomething;
