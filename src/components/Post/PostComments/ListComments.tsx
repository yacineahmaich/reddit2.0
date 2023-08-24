import Avatar from "@/components/ui/Avatar";
import { usePostComments } from "@/features/posts/usePostComments";
import { Box, Flex, Text } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

type ListCommentsProps = {};

const ListComments: React.FC<ListCommentsProps> = () => {
  const router = useRouter();
  const { data: comments, isLoading } = usePostComments(
    router.query.postId as string
  );

  return (
    <Flex direction="column" mt={6} gap={6}>
      {comments?.map((comment) => (
        <Flex key={comment.id} opacity={comment.isPending ? ".5" : "1"}>
          <Box pr={4}>
            <Avatar
              source={comment.author.profile}
              alt={comment.id!}
              size={9}
            />
          </Box>
          <Box>
            <Flex align="center" gap={2} mb={2}>
              <Text fontWeight={600} fontSize="10pt" color="gray.600">
                {comment.author.name}
              </Text>
              <Text fontSize="10pt" color="gray.400">
                {comment.isPending
                  ? "a few seconds ago"
                  : moment(
                      comment.createdAt?.toDate?.() ?? comment.createdAt
                    ).fromNow()}
              </Text>
            </Flex>
            <Box>
              <Text fontSize="11pt">{comment.body}</Text>
            </Box>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};
export default ListComments;
