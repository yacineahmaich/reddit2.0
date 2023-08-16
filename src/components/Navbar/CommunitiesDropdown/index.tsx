import { Menu, Flex, MenuList, Spinner } from "@chakra-ui/react";
import React from "react";
import { useUserSnippets } from "@/features/user/useUserSnippets";
import CreateCommunity from "./CreateCommunity";
import FollowingCommunities from "./FollowingCommunities";
import ModeratingCommunities from "./ModeratingCommunities";
import DropdownButton from "./DropdownButton";

const CommunitiesDropdown: React.FC = () => {
  const { communitySnippets, isLoading } = useUserSnippets();

  return (
    <Menu>
      <DropdownButton />
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
