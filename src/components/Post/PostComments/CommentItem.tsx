import Avatar from "@/components/ui/Avatar";
import { Comment } from "@/types/database";
import { Box, Flex, Text } from "@chakra-ui/react";
import moment from "moment";

type CommentItemProps = {
  comment: Comment;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <Flex key={comment.id} opacity={comment.isPending ? ".5" : "1"}>
      <Box>
        <Avatar source={comment.author.profile} alt={comment.id!} size={9} />
      </Box>
      <Box px={4}>
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
          <Text overflowWrap="anywhere" fontSize="11pt" >
            {comment.body}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default CommentItem;
