import React from "react";
import { Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const JoinedCommunitySkeleton: React.FC = () => {
  return (
    <Flex
      align="center"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      p={2}
      borderRadius={4}
    >
      <Flex gap={4}>
        <SkeletonCircle h={12} w={12} />
        <Flex justify="space-evenly" direction="column">
          <Skeleton h={2} rounded="full" w="60px" />
          <Skeleton h={2} rounded="full" w="40px" />
        </Flex>
      </Flex>
    </Flex>
  );
};
export default JoinedCommunitySkeleton;
