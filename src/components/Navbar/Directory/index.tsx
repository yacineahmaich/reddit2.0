import { Menu, Flex, MenuList, Spinner } from "@chakra-ui/react";
import React from "react";
import { useDirectory } from "@/features/user/useDirectory";
import CreateCommunity from "./CreateCommunity";
import FollowingCommunities from "./FollowingCommunities";
import ModeratingCommunities from "./ModeratingCommunities";
import OpenDirectory from "./OpenDirectory";
import { useRecoilState } from "recoil";
import { directoryMenuAtom } from "@/atoms/directoryMenuAtom";

const CommunitiesDropdown: React.FC = () => {
  const { data: communitySnippets = [], isLoading } = useDirectory();

  const [directoryMenuState, setDirectoryMenuState] =
    useRecoilState(directoryMenuAtom);

  function handleCloseMenu() {
    setDirectoryMenuState((prev) => ({
      ...prev,
      menuOpen: false,
    }));
  }
  function handleOpenMenu() {
    setDirectoryMenuState((prev) => ({
      ...prev,
      menuOpen: true,
    }));
  }

  return (
    <Menu
      isOpen={directoryMenuState.menuOpen}
      onClose={handleCloseMenu}
      onOpen={handleOpenMenu}
    >
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
