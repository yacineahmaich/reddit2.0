import { usePostComments } from "@/features/posts/usePostComments";
import useQueryParam from "@/hooks/useQueryParam";
import { Flex } from "@chakra-ui/react";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";

const ListComments: React.FC = () => {
  const postId = useQueryParam("postId");
  const { data: comments, isLoading } = usePostComments(postId);

  return (
    <Flex direction="column" mt={6} gap={6}>
      {isLoading ? (
        <>
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </>
      ) : (
        <>
          {comments?.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </>
      )}
    </Flex>
  );
};
export default ListComments;
