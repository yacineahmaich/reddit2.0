import React, { useState } from "react";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "@/components/Modal/Community/CreateCommunityModal";

type CommunitiesListProps = {};

const CommunitiesList: React.FC<CommunitiesListProps> = () => {
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
        <Flex fontSize="11pt" fontWeight={700} gap={2}>
          <Icon as={GrAdd} fontSize={20} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};
export default CommunitiesList;
