import { Post } from "@/types/database";
import { Stack } from "@chakra-ui/react";
import React from "react";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";

type PostsFeedProps = {
  posts?: Post[];
  isLoading: boolean;
  isCommunityFeed?: boolean;
};

const PostsFeed: React.FC<PostsFeedProps> = ({
  posts = [],
  isLoading,
  isCommunityFeed,
}) => {
  return (
    <>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <Stack>
          {posts?.map((post) => (
            <PostItem
              key={post.id}
              post={post!}
              isCommunityFeed={isCommunityFeed}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default PostsFeed;
