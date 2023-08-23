import AboutCommunity from "@/components/Community/AboutCommunity";
import CommunityHeader from "@/components/Community/CommunityHeader";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import PageContent from "@/components/Layout/PageContent";
import CommunityPosts from "@/components/Post/CommunityPosts";
import { useCommunity } from "@/features/communities/useCommunity";
import React from "react";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import { NextPageWithLayout } from "@/pages/_app";

const CommunityPage: NextPageWithLayout = () => {
  const { community, isLoading } = useCommunity();

  if (!isLoading && !community) return <CommunityNotFound />;

  return (
    <>
      <CreatePostLink />
      <CommunityPosts />
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
