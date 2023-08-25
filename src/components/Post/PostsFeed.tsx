import { Post } from "@/types/database";
import { Stack } from "@chakra-ui/react";
import React from "react";
import PostItem from "./PostItem";
import PostSkeleton from "./PostSkeleton";

type PostsFeedProps = {
  posts?: Post[];
  isLoading: boolean;
};

const PostsFeed: React.FC<PostsFeedProps> = ({ posts = [], isLoading }) => {
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
export default PostsFeed;
