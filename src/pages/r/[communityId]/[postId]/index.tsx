import AboutCommunity from "@/components/Community/AboutCommunity";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Post/PostItem";
import PostSkeleton from "@/components/Post/PostSkeleton";
import { usePost } from "@/features/posts/usePost";
import { NextPageWithLayout } from "@/pages/_app";
import React from "react";

const PostPage: NextPageWithLayout = () => {
  const { data: post, isLoading } = usePost();

  if (isLoading || !post) return <PostSkeleton />;

  return <PostItem post={post} isSinglePostPage />;
};

// Page Layout
PostPage.getLayout = (page) => {
  return (
    <PageContent>
      <>{page}</>
      <>
        <AboutCommunity />
      </>
    </PageContent>
  );
};

export default PostPage;
