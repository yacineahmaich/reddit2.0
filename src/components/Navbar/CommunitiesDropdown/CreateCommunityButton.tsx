import CreateCommunityModal from "@/components/Modal/Community/CreateCommunityModal";
import { MenuItem, Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

const CreateCommunityButton: React.FC = () => {
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
      >
        <Flex fontSize="11pt" align="center" fontWeight={700} gap={2}>
          <Icon as={GrAdd} fontSize={16} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};
export default CreateCommunityButton;
