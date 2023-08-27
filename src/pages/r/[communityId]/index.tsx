import AboutCommunity from "@/components/Community/AboutCommunity";
import CommunityHeader from "@/components/Community/CommunityHeader";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import PageContent from "@/components/Layout/PageContent";
import { useCommunity } from "@/features/communities/useCommunity";
import React from "react";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import { NextPageWithLayout } from "@/pages/_app";
import { useCommunityPosts } from "@/features/communities/useCommunityPosts";
import PostsFeed from "@/components/Post/PostsFeed";
import Head from "next/head";

const CommunityPage: NextPageWithLayout = () => {
  const { community, isLoading: isCommunityLoading } = useCommunity();
  const { data: posts, isLoading: isCommunityPostsLoading } =
    useCommunityPosts();

  if (!isCommunityLoading && !community) return <CommunityNotFound />;

  return (
    <>
      <Head>
        <title>r / {community?.id}</title>
      </Head>
      <CreatePostLink />
      <PostsFeed
        posts={posts}
        isLoading={isCommunityPostsLoading}
        isCommunityFeed
      />
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
