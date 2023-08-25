import { Flex, SkeletonCircle, SkeletonText, Skeleton } from "@chakra-ui/react";
import React from "react";

type PostSkeletonProps = {
  isSinglePostPage?: boolean;
};

const PostSkeleton: React.FC<PostSkeletonProps> = ({ isSinglePostPage }) => {
  return (
    <Flex
      direction="column"
      bg="white"
      gap={4}
      p={8}
      height="480px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius={isSinglePostPage ? "4px 4px 0 0 " : 4}
    >
      <Flex gap={4} align="center">
        <SkeletonCircle width={10} height={10} />
        <SkeletonText height={5} w="50%" noOfLines={1} />
      </Flex>
      <SkeletonText height={7} />
      <Skeleton flexGrow={1} mt={4} />
    </Flex>
  );
};
export default PostSkeleton;
