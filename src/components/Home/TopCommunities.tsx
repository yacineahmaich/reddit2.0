import { authModalAtom } from "@/atoms/authModalAtom";
import { useJoinLeaveCommunity } from "@/features/communities/useJoinLeaveCommunity";
import { useTopCommunities } from "@/features/home/useTopCommunities";
import { useDirectory } from "@/features/user/useDirectory";
import { auth } from "@/firebase/client";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import Avatar from "../ui/Avatar";

type TopCommunitiesProps = {};

const TopCommunities: React.FC<TopCommunitiesProps> = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalAtom);

  const { data: TopCommunities, isLoading } = useTopCommunities();
  const { data: communitySnippets } = useDirectory();

  const { mutate: joinLeaveCommunity } = useJoinLeaveCommunity();

  const handleJoinLeaveCommunity = (communityId: string) => {
    if (!user) return setAuthModalState({ open: true, view: "login" });

    joinLeaveCommunity({ communityId, userId: user?.uid! });
  };

  return (
    <Flex
      direction="column"
      borderRadius={4}
      overflow="hidden"
      border="1px solid"
      borderColor="gray.300"
      bg="white"
    >
      <Flex
        align="end"
        bgImage="/images/recCommsArt.png"
        backgroundSize="cover"
        height="70px"
        p="6px 10px"
        position="relative"
        bgGradient="linear-gradient(to bottom,rgba(0,0,0, 0), rgba(0,0,0, .75)),url('/images/recCommsArt.png')"
      >
        <Text color="white" fontWeight={700} zIndex={10}>
          Top Communities
        </Text>
      </Flex>
      <Flex direction="column" align="center" justify="center" minH="100px">
        {isLoading ? (
          <Spinner color="brand.100" />
        ) : (
          <>
            {TopCommunities?.map((community, idx) => {
              const isJoined = communitySnippets?.find(
                (s) => s.communityId === community.id
              );

              return (
                <Flex
                  key={community.id}
                  align="center"
                  w="full"
                  p={3}
                  fontWeight={600}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  fontSize="10pt"
                >
                  <Text mr={4}>{idx + 1}</Text>
                  <Box flexShrink={0}>
                    <Avatar
                      source={community.imageURL}
                      alt={community.id}
                      size={7}
                    />
                  </Box>
                  <Text
                    ml={2}
                    mr={4}
                    isTruncated
                    as={Link}
                    href={`/r/${community.id}`}
                    _hover={{
                      textDecoration: "underline",
                    }}
                  >
                    {community.id}
                  </Text>
                  <Button
                    variant={isJoined ? "outline" : "solid"}
                    size="xs"
                    px={4}
                    ml="auto"
                    flexShrink={0}
                    onClick={() => handleJoinLeaveCommunity(community.id)}
                  >
                    {isJoined ? "Joined" : "Join"}
                  </Button>
                </Flex>
              );
            })}
            <Flex p={2} w="full">
              <Button size="xs" w="full">
                View All
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default TopCommunities;
