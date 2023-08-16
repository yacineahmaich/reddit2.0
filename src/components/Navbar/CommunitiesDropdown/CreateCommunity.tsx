import CreateCommunityModal from "./CreateCommunityModal";
import { MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const CreateCommunity: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <>
      <CreateCommunityModal open={modalOpen} onClose={closeModal} />

      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setModalOpen(true)}
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
