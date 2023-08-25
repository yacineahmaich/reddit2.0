import Avatar from "@/components/ui/Avatar";
import { getStorageDownloadUrl } from "@/firebase/helpers";
import { CommunitySnippet } from "@/types/database";
import { Flex, MenuGroup, MenuItem, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type FollowingCommunitiesProps = {
  communitySnippets: CommunitySnippet[];
};

const FollowingCommunities: React.FC<FollowingCommunitiesProps> = ({
  communitySnippets,
}) => {
  const followingCommunities = communitySnippets?.filter(
    (snippet) => !snippet.isModerator
  );

  if (followingCommunities?.length === 0) return null;

  return (
    <MenuGroup title="FOLLOWING" color="gray.400">
      {followingCommunities.map((snippet) => (
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
              source={getStorageDownloadUrl(
                `communities/${snippet.communityId}`
              )}
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
export default FollowingCommunities;
