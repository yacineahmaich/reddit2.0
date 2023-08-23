import { useDeletePost } from "@/features/posts/useDeletePost";
import { Post } from "@/types/global";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";

type PostActionsProps = {
  post: Post;
};

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { mutate: deletePost, isLoading: isDeleting } = useDeletePost();

  return (
    <Box position="absolute" right="10px" top="10px">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Post Actions"
          icon={<HiDotsVertical />}
          variant="ghost"
          _hover={{ bg: "none" }}
          _active={{ bg: "none" }}
        />
        <MenuList fontSize="10pt" minW="160px">
          <MenuItem
            icon={<EditIcon />}
            as={Link}
            href={`/r/${post.communityId}/submit?post=${post.id}`}
          >
            Edit
          </MenuItem>
          <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      {/* COnfirm Delete */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="11pt">Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="gray.400" fontWeight={600} fontSize="10pt">
            Are you sure about deleting this post ? This action cannot be undone !
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              px={30}
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              px={30}
              onClick={() => deletePost({ post })}
              isLoading={isDeleting}
            >
              Sure, delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default PostActions;
