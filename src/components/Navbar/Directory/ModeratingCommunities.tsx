import Avatar from "@/components/ui/Avatar";
import { CommunitySnippet } from "@/types/database";
import { Flex, MenuGroup, MenuItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type ModeratingCommunitiesProps = {
  communitySnippets: CommunitySnippet[];
};

const ModeratingCommunities: React.FC<ModeratingCommunitiesProps> = ({
  communitySnippets,
}) => {
  const moderatingCommunities = communitySnippets?.filter(
    (snippet) => snippet.isModerator
  );

  if (moderatingCommunities.length === 0) return null;

  return (
    <MenuGroup title="MODERATING" color="gray.400">
      {moderatingCommunities.map((snippet) => (
        <MenuItem
          key={snippet.communityId}
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          as={Link}
          href={`/r/${snippet.communityId}`}
        >
          <Flex fontSize="11pt" align="center" gap={2}>
            <Avatar
              source={snippet.imageURL}
              alt={snippet.communityId}
              size={9}
            />
            <Text>r/{snippet.communityId}</Text>
          </Flex>
        </MenuItem>
      ))}
    </MenuGroup>
  );
};
export default ModeratingCommunities;
