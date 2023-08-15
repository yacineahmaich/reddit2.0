import { authModalState } from "@/atoms/authModalAtom";
import { useCommunity } from "@/features/communities/useCommunity";
import { useJoinLeaveCommunity } from "@/features/communities/useJoinLeaveCommunity";
import { CommunitySnippet } from "@/features/user/types";
import { useUserSnippets } from "@/features/user/useUserSnippets";
import { auth } from "@/firebase/client";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Text,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

const Header: React.FC = () => {
  const router = useRouter();
  const { community, isLoading: isCommunityLoading } = useCommunity(
    router.query.id as string
  );

  const setAuthModalState = useSetRecoilState(authModalState);

  const [user] = useAuthState(auth);

  const { joinLeaveCommunity, isLoading } = useJoinLeaveCommunity();

  const { communitySnippets } = useUserSnippets();

  function handleJoinLeaveCommunity() {
    if (!communitySnippets || !community) return;

    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    joinLeaveCommunity({
      community: community,
      userId: user?.uid,
      communitySnippets: communitySnippets,
    });
  }

  // const isJoined = isJoinedCommunity(community.id);
  const communitySnippet =
    (communitySnippets?.find(
      (snippet) => snippet.communityId === community?.id
    ) as CommunitySnippet) || null;

  const isJoined = Boolean(communitySnippet);

  const isModerator = communitySnippet?.isModerator;

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.500" />
      <Flex justify="center" bg="white" grow={1}>
        <Flex width="95%" maxW="860px">
          <Box
            w={16}
            h={16}
            mt={-3}
            border="4px solid white"
            borderRadius="full"
          >
            <SkeletonCircle w="full" h="full" isLoaded={!!community}>
              {community?.imageURL ? (
                <Image
                  src={community?.imageURL}
                  borderRadius="full"
                  w="full"
                  h="full"
                  objectFit="cover"
                  alt={community?.id}
                />
              ) : (
                <Icon
                  as={FaReddit}
                  w="full"
                  h="full"
                  borderRadius="full"
                  color="blue.500"
                />
              )}
            </SkeletonCircle>
          </Box>
          <Flex p="10px 16px">
            <Flex direction="column" mr={6}>
              {isCommunityLoading ? (
                <>
                  <Skeleton height={3} w={20} my={2} />
                  <Skeleton height={2} w={16} />
                </>
              ) : (
                <>
                  <Text fontWeight={800} fontSize="16pt">
                    {community?.id}
                  </Text>
                  <Text fontWeight={800} fontSize="10pt" color="gray.400">
                    r/{community?.id}
                  </Text>
                </>
              )}
            </Flex>
            {!isCommunityLoading && (
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="30px"
                px={6}
                isLoading={isLoading}
                onClick={() => handleJoinLeaveCommunity()}
                isDisabled={isModerator}
              >
                {isJoined ? "joined" : "join"}
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
