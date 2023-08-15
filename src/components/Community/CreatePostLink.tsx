import { authModalState } from "@/atoms/authModalAtom";
import { useCommunity } from "@/features/communities/useCommunity";
import { auth } from "@/firebase/client";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

type CreatePostProps = {};

const CreatePostLink: React.FC<CreatePostProps> = () => {
  const router = useRouter();
  const { community, isLoading } = useCommunity(router.query.id as string);

  const [user] = useAuthState(auth);
  const setAuthModal = useSetRecoilState(authModalState);

  const onNavigateToSubmitPage = () => {
    // Could check for user to open auth modal before redirecting to submit
    if (!user) {
      setAuthModal({ open: true, view: "login" });
    } else {
      // Open directory menu to select community to post to
      router.push(`${router.asPath}/submit`);
    }
  };
  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
      <Input
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onNavigateToSubmitPage}
        disabled={isLoading || !community}
        _disabled={{
          cursor: "auto",
        }}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  );
};
export default CreatePostLink;