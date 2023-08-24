import Avatar from "@/components/ui/Avatar";
import { Flex, Box, Text, SkeletonCircle, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const CommentSkeleton: React.FC = () => {
  return (
    <Flex maxW="300px">
      <Box pr={4}   >
        <SkeletonCircle w={9} h={9} />
      </Box>
      <Box w="full">
        <Flex align="center" gap={2} mb={4}>
          <Skeleton h={3} w={14} rounded="full" />
          <Skeleton h={2} w={7} rounded="full" />
        </Flex>
        <Box>
          <SkeletonText w="full" noOfLines={2} />
        </Box>
      </Box>
    </Flex>
  );
};
export default CommentSkeleton;
