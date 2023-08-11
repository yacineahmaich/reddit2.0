import { Community } from "@/atoms/communitiesAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  community: Community;
};

const Header: React.FC<HeaderProps> = ({ community }) => {
  const isJoined = false;

  return (
    <Flex direction="column" width="100%" height="146px">
      <Box height="50%" bg="blue.500" />
      <Flex justify="center" bg="white" grow={1}>
        <Flex width="95%" maxW="860px">
          {community.imageURL ? (
            <Image src={community.imageURL} alt={community.id} />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              mt={-3}
              border="4px solid white"
              borderRadius="full"
              color="blue.500"
            />
          )}
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
