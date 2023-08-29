import { Post } from "@/types/database";
import { Stack } from "@chakra-ui/react";
import React from "react";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";

type PostsFeedProps = {
  posts?: Post[];
  isLoading: boolean;
  isCommunityFeed?: boolean;
  isSavedPage?: boolean;
};

const PostsFeed: React.FC<PostsFeedProps> = ({
  posts = [],
  isLoading,
  isCommunityFeed,
  isSavedPage,
}) => {
  return (
    <>
      {isLoading ? (
        <Stack>
          <PostSkeleton isCommunityFeed={isCommunityFeed} />
          <PostSkeleton isCommunityFeed={isCommunityFeed} />
          <PostSkeleton isCommunityFeed={isCommunityFeed} />
        </Stack>
      ) : (
        <Stack>
          {posts?.map((post) => (
            <PostItem
              key={post.id}
              post={post!}
              isCommunityFeed={isCommunityFeed}
              isSavedPage={isSavedPage}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default PostsFeed;
