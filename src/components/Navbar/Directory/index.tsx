import { Menu, Flex, MenuList, Spinner } from "@chakra-ui/react";
import React from "react";
import { useDirectory } from "@/features/user/useDirectory";
import CreateCommunity from "./CreateCommunity";
import FollowingCommunities from "./FollowingCommunities";
import ModeratingCommunities from "./ModeratingCommunities";
import OpenDirectory from "./OpenDirectory";

const CommunitiesDropdown: React.FC = () => {
  const { data: communitySnippets = [], isLoading } = useDirectory();

  return (
    <Menu>
      <OpenDirectory />
      <MenuList>
        {isLoading ? (
          <Flex justify="center">
            <Spinner color="gray.300" my={5} />
          </Flex>
        ) : (
          <>
            <CreateCommunity />
            <ModeratingCommunities communitySnippets={communitySnippets} />
            <FollowingCommunities communitySnippets={communitySnippets} />
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default CommunitiesDropdown;
