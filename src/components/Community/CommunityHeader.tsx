import { authModalAtom } from "@/atoms/authModalAtom";
import { useCommunity } from "@/features/communities/useCommunity";
import { useJoinLeaveCommunity } from "@/features/communities/useJoinLeaveCommunity";
import { useDirectory } from "@/features/user/useDirectory";
import { auth } from "@/firebase/client";
import { CommunitySnippet } from "@/types/database";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import Avatar from "../ui/Avatar";

const CommunityHeader: React.FC = () => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const { community, isLoading: isCommunityLoading } = useCommunity();
  const { mutate: joinLeaveCommunity } = useJoinLeaveCommunity();
  const { data: communitySnippets = [] } = useDirectory();

  function handleJoinLeaveCommunity() {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    joinLeaveCommunity({
      communityId: community.id!,
      user,
    });
  }

  const communitySnippet = communitySnippets?.find(
    (snippet) => snippet.communityId === community?.id
  ) as CommunitySnippet | null;

  const isJoined = !!communitySnippet;
  const isCreator = user?.uid === community.creatorId;
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
              <Avatar source={community?.imageURL} alt={community?.id} />
            </SkeletonCircle>
          </Box>
          <Flex p="10px 16px">
            <Flex direction="column" mr={6}>
              {isCommunityLoading || !community ? (
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
            {!isCommunityLoading && !isCreator && (
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="30px"
                px={6}
                onClick={() => handleJoinLeaveCommunity()}
                _disabled={{
                  cursor: "auto",
                  color: "gray.300",
                  borderColor: "gray.300",
                }}
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
export default CommunityHeader;
