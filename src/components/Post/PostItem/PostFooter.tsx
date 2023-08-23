import { Post } from "@/types/global";
import { HStack, Button } from "@chakra-ui/react";
import React from "react";
import { BsChat } from "react-icons/bs";
import { IoArrowRedoOutline, IoBookmarkOutline } from "react-icons/io5";

type PostFooterProps = {
  post: Post;
};

const PostFooter: React.FC<PostFooterProps> = ({ post }) => {
  return (
    <HStack ml={1} mb={0.5}>
      <Button
        leftIcon={<BsChat />}
        size="sm"
        _hover={{ bg: "gray.100" }}
        color="gray.500"
        fontSize="9pt"
        fontWeight={700}
        variant="ghost"
        borderRadius={4}
      >
        {post.numOfComments}
      </Button>
      <Button
        leftIcon={<IoArrowRedoOutline />}
        size="sm"
        _hover={{ bg: "gray.100" }}
        color="gray.500"
        fontSize="9pt"
        fontWeight={400}
        variant="ghost"
        borderRadius={4}
      >
        Share
      </Button>
      <Button
        leftIcon={<IoBookmarkOutline />}
        size="sm"
        _hover={{ bg: "gray.100" }}
        color="gray.500"
        fontSize="9pt"
        fontWeight={400}
        variant="ghost"
        borderRadius={4}
      >
        Save
      </Button>
    </HStack>
  );
};
export default PostFooter;
