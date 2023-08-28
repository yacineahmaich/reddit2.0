import { Flex, SkeletonCircle, SkeletonText, Skeleton } from "@chakra-ui/react";
import React from "react";

type PostSkeletonProps = {
  isSinglePostPage?: boolean;
  isCommunityFeed?: boolean;
};

const PostSkeleton: React.FC<PostSkeletonProps> = ({
  isSinglePostPage,
  isCommunityFeed,
}) => {
  return (
    <Flex
      direction="column"
      bg="white"
      gap={4}
      p={6}
      pl="45px"
      height={isSinglePostPage ? "600px" : "480px"}
      border="1px solid"
      borderColor="gray.300"
      borderRadius={isSinglePostPage ? "4px 4px 0 0 " : 4}
    >
      <Flex gap={4} align="center">
        {!isCommunityFeed && <SkeletonCircle width={7} height={7} />}
        <Skeleton height={2} w="50%" />
      </Flex>
      <Skeleton height={2} w="30%" />
      <SkeletonText height={7} />
      <Skeleton flexGrow={1} mt={4} />
    </Flex>
  );
};
export default PostSkeleton;
