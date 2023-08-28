import { authModalAtom } from "@/atoms/authModalAtom";
import { directoryMenuAtom } from "@/atoms/directoryMenuAtom";
import { useCommunity } from "@/features/communities/useCommunity";
import { auth } from "@/firebase/client";
import useQueryParam from "@/hooks/useQueryParam";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useRecoilState, useSetRecoilState } from "recoil";

type CreatePostProps = {
  isHomeFeed?: boolean;
};

const CreatePostLink: React.FC<CreatePostProps> = ({ isHomeFeed }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [directoryMenuState, setDirectoryMenuState] =
    useRecoilState(directoryMenuAtom);
  const communityId = useQueryParam("communityId");

  const { community, isLoading } = useCommunity();
  const setAuthModalState = useSetRecoilState(authModalAtom);

  const handleInputClick = (e: React.MouseEvent) => {
    if (!user) {
      return setAuthModalState({ open: true, view: "login" });
    }
    if (isHomeFeed) {
      // @ts-ignore
      e.target?.blur();
      return setDirectoryMenuState((prev) => ({ ...prev, menuOpen: true }));
    }

    router.push(`${router.asPath}/submit`);
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
        onClick={handleInputClick}
        isDisabled={
          ((isLoading || !community) && !!communityId) ||
          directoryMenuState.menuOpen
        }
        _disabled={{
          cursor: "auto",
        }}
        cursor="pointer"
        tabIndex={-1}
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
