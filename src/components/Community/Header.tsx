import { Community } from "@/atoms/communitiesAtom";
import { useCommunityData } from "@/hooks/useCommunityData";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  community: Community;
};

const Header: React.FC<HeaderProps> = ({ community }) => {
  const { joinOrLeaveCommunity, isJoinedCommunity, isLoading } =
    useCommunityData();

  const isJoined = isJoinedCommunity(community.id);

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
            {community.imageURL ? (
              <Image
                src={community.imageURL}
                borderRadius="full"
                w="full"
                h="full"
                objectFit="cover"
                alt={community.id}
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
          </Box>
          <Flex p="10px 16px">
            <Flex direction="column" mr={6}>
              <Text fontWeight={800} fontSize="16pt">
                {community.id}
              </Text>
              <Text fontWeight={800} fontSize="10pt" color="gray.400">
                r/{community.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height="30px"
              px={6}
              isLoading={isLoading}
              onClick={() => joinOrLeaveCommunity(community, isJoined)}
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
