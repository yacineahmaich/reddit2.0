import { CommunitySnippet } from "@/features/user/types";
import {
  Box,
  Flex,
  Icon,
  MenuGroup,
  MenuItem,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

type ModeratingCommunitiesProps = {
  communitySnippets: CommunitySnippet[];
};

const ModeratingCommunities: React.FC<ModeratingCommunitiesProps> = ({
  communitySnippets,
}) => {
  return (
    <MenuGroup title="MODERATING" color="gray.400">
      {communitySnippets
        ?.filter((snippet) => snippet.isModerator)
        .map((snippet) => (
          <MenuItem
            key={snippet.communityId}
            width="100%"
            fontSize="10pt"
            _hover={{ bg: "gray.100" }}
          >
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
          </MenuItem>
        ))}
    </MenuGroup>
  );
};
export default ModeratingCommunities;
