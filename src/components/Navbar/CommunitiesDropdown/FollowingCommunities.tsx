import { CommunitySnippet } from "@/features/user/types";
import {
  MenuGroup,
  MenuItem,
  Flex,
  Icon,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaReddit } from "react-icons/fa";

type FollowingCommunitiesProps = {
  communitySnippets: CommunitySnippet[];
};

const FollowingCommunities: React.FC<FollowingCommunitiesProps> = ({
  communitySnippets,
}) => {
  const followingCommunities = communitySnippets?.filter(
    (snippet) => !snippet.isModerator
  );

  if (followingCommunities.length === 0) return null;

  return (
    <MenuGroup title="FOLLOWING" color="gray.400">
      {followingCommunities.map((snippet) => (
        <MenuItem
          key={snippet.communityId}
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
        >
          <Link href={`/r/${snippet.communityId}`}>
            <Flex fontSize="11pt" align="center" gap={2}>
              <Box w={9} h={9}>
                {snippet?.imageURL ? (
                  <Image
                    src={snippet?.imageURL}
                    borderRadius="full"
                    w="full"
                    h="full"
                    objectFit="cover"
                    alt={snippet?.communityId}
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
              <Text>r/{snippet.communityId}</Text>
            </Flex>
          </Link>
        </MenuItem>
      ))}
    </MenuGroup>
  );
};
export default FollowingCommunities;
