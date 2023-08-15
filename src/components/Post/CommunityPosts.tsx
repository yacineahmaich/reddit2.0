import { auth } from "@/firebase/client";
import { usePosts } from "@/hooks/usePosts";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import { Stack } from "@chakra-ui/react";
import PostSkeleton from "./PostSkeleton";
import { useCommunityPosts } from "@/features/posts/useCommunityPosts";
import { useRouter } from "next/router";

const CommunityPosts: React.FC = () => {
  const router = useRouter();
  const { posts, isLoading } = useCommunityPosts(router.query.id as string);

  const [user] = useAuthState(auth);
  const { postState, setPostState, onDeletePost, onSelectPost, onVotePost } =
    usePosts();

  return (
    <>
      {isLoading || !posts ? (
        <PostSkeleton />
      ) : (
        <Stack>
          {posts.map((post) => (
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
