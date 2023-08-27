import ErrorMessage from "@/components/ui/ErrorMessage";
import { useDeletePost } from "@/features/posts/useDeletePost";
import { Post } from "@/types/database";
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";

type PostActionsProps = {
  post: Post;
};

const PostActions: React.FC<PostActionsProps> = ({ post }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    mutate: deletePost,
    isLoading: isDeleting,
    isError,
  } = useDeletePost();

  return (
    <Box position="absolute" right="10px" top="10px">
      <Menu placement="top-end" isLazy>
        <MenuButton
          as={IconButton}
          aria-label="Post Actions"
          icon={<HiDotsVertical />}
          variant="ghost"
          _hover={{ bg: "none" }}
          _active={{ bg: "none" }}
        />
        <MenuList minW="160px">
          <MenuItem
            icon={<EditIcon />}
            as={Link}
            href={`/r/${post.communityId}/submit?post=${post.id}`}
            fontSize="10pt"
          >
            Edit
          </MenuItem>
          <MenuItem icon={<DeleteIcon />} onClick={onOpen} fontSize="10pt">
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      {/* COnfirm Delete */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={3}>
          <ModalHeader fontSize="11pt">Delete Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isError && (
              <ErrorMessage error="Could not delete post! Please try again." />
            )}
            <Text color="gray.400" fontWeight={600} fontSize="10pt">
              Are you sure about deleting this post ? This action cannot be
              undone !
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              size="sm"
              color="gray.500"
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
