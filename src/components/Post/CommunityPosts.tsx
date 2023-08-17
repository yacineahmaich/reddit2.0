import { auth } from "@/firebase/client";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import { Stack } from "@chakra-ui/react";
import PostSkeleton from "./PostSkeleton";
import { useCommunityPosts } from "@/features/posts/useCommunityPosts";
import { useUserVotes } from "@/features/user/useUserVotes";

const CommunityPosts: React.FC = () => {
  const [user] = useAuthState(auth);
  const { data: votes } = useUserVotes();
  const { data: posts, isLoading } = useCommunityPosts();

  function getUserVote(postId: string) {
    const postVote = votes?.find((v) => v.postId === postId);

    return postVote ? postVote.vote : 0;
  }

  return (
    <>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <Stack>
          {posts?.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={getUserVote(post.id!)}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default CommunityPosts;
