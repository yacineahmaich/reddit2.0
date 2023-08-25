import AboutCommunity from "@/components/Community/AboutCommunity";
import CommunityHeader from "@/components/Community/CommunityHeader";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import PageContent from "@/components/Layout/PageContent";
import { useCommunity } from "@/features/communities/useCommunity";
import React from "react";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import { NextPageWithLayout } from "@/pages/_app";
import { useCommunityPosts } from "@/features/posts/useCommunityPosts";
import PostsFeed from "@/components/Post/PostsFeed";

const CommunityPage: NextPageWithLayout = () => {
  const { community, isLoading: isCommunityLoading } = useCommunity();
  const { data: posts, isLoading: isCommunityPostsLoading } =
    useCommunityPosts();

  if (!isCommunityLoading && !community) return <CommunityNotFound />;

  return (
    <>
      <CreatePostLink />
      <PostsFeed posts={posts} isLoading={isCommunityPostsLoading} />
    </>
  );
};

// Page Layout
CommunityPage.getLayout = (page) => {
  return (
    <>
      <CommunityHeader />
      <PageContent>
        <>{page}</>
        <>
          <AboutCommunity />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;
