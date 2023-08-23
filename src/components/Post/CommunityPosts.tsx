import { useCommunityPosts } from "@/features/posts/useCommunityPosts";
import { Stack } from "@chakra-ui/react";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";

const CommunityPosts: React.FC = () => {
  const { data: posts, isLoading } = useCommunityPosts();

  return (
    <>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <Stack>
          {posts?.map((post) => (
            <PostItem key={post.id} post={post!} />
          ))}
        </Stack>
      )}
    </>
  );
};
export default CommunityPosts;
