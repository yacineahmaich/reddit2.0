import { authModalAtom } from "@/atoms/authModalAtom";
import Avatar from "@/components/ui/Avatar";
import { useJoinLeaveCommunity } from "@/features/communities/useJoinLeaveCommunity";
import { auth } from "@/firebase/client";
import { Community } from "@/types/database";
import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type CommunityItemProps = {
  community: Community;
  isJoined: boolean;
};

const CommunityItem: React.FC<CommunityItemProps> = ({
  community,
  isJoined,
}) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const { mutate: joinLeaveCommunity } = useJoinLeaveCommunity();

  const handleJoinLeaveCommunity = (communityId: string) => {
    if (!user) return setAuthModalState({ open: true, view: "login" });

    joinLeaveCommunity({ communityId, user: user! });
  };

  return (
    <Flex
      key={community.id}
      align="center"
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      p={2}
      borderRadius={4}
    >
      <Flex gap={4}>
        <Avatar source={community.imageURL} alt={community.id} size={12} />
        <Flex justify="space-evenly" direction="column">
          <Text
            fontSize="10pt"
            fontWeight={700}
            _hover={{ textDecoration: "underline" }}
            as={Link}
            href={`/r/${community.id}`}
          >
            r/{community.id}
          </Text>
          <Text fontSize="9pt">{community.numOfMembers} members</Text>
        </Flex>
      </Flex>
      <Button
        variant={isJoined ? "outline" : "solid"}
        size="xs"
        px={30}
        ml="auto"
        onClick={() => handleJoinLeaveCommunity(community.id)}
      >
        {isJoined ? "Joined" : "Join"}
      </Button>
    </Flex>
  );
};
export default CommunityItem;
