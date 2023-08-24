import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import CommentForm from "./CommentForm";
import ListComments from "./ListComments";
import { usePost } from "@/features/posts/usePost";

type PostCommentsProps = {};

const PostComments: React.FC<PostCommentsProps> = () => {
  const { data: post } = usePost();

  return (
    <Flex
      w="full"
      pl="40px"
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderTop="none"
    >
      <Box p={4} w="full">
        <CommentForm post={post!} />
        <Text fontWeight={600}>Comments({post?.numOfComments})</Text>
        <ListComments />
      </Box>
    </Flex>
  );
};
export default PostComments;
