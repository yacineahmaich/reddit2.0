import { directoryMenuAtom } from "@/atoms/directoryMenuAtom";
import { MenuItem } from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";
import CreateCommunityModal from "./CreateCommunityModal";

const CreateCommunity: React.FC = () => {
  const [directoryMenuState, setDirectoryMenuState] =
    useRecoilState(directoryMenuAtom);

  function closeCreateCommunityModal() {
    setDirectoryMenuState((prev) => ({
      ...prev,
      createCommunityOpen: false,
    }));
  }

  function openCreateCommunityModal() {
    setDirectoryMenuState((prev) => ({
      ...prev,
      createCommunityOpen: true,
    }));
  }

  return (
    <>
      <CreateCommunityModal
        open={directoryMenuState.createCommunityOpen}
        onClose={closeCreateCommunityModal}
      />

      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={openCreateCommunityModal}
        color="gray.400"
        icon={<FaPlus />}
        fontWeight={700}
      >
        Create Community
      </MenuItem>
    </>
  );
};
export default CreateCommunity;
