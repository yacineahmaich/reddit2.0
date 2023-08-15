import { useCommunity } from "@/features/communities/useCommunity";
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
import { FaReddit } from "react-icons/fa";

const Header: React.FC = () => {
  const router = useRouter();
  const { community, isLoading } = useCommunity(router.query.id as string);

  // const { joinOrLeaveCommunity, isJoinedCommunity, isLoading } =
  //   useCommunityData();

  // const isJoined = isJoinedCommunity(community.id);
  const isJoined = true;

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
              {isLoading ? (
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
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              px={6}
              isLoading={isLoading}
              onClick={() => null}
            >
              {isJoined ? "joined" : "join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
