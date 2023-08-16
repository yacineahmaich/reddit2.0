import { auth } from "@/firebase/client";
import { usePosts } from "@/hooks/usePosts";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import { Stack } from "@chakra-ui/react";
import PostSkeleton from "./PostSkeleton";
import { useCommunityPosts } from "@/features/posts/useCommunityPosts";

const CommunityPosts: React.FC = () => {
  const [user] = useAuthState(auth);
  const { posts, isLoading } = useCommunityPosts();

  const { postState, setPostState, onDeletePost, onSelectPost, onVotePost } =
    usePosts();

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
              onSelectPost={onSelectPost}
              onVotePost={onVotePost}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={1}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default CommunityPosts;
