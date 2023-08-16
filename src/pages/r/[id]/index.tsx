import AboutCommunity from "@/components/Community/AboutCommunity";
import CommunityHeader from "@/components/Community/CommunityHeader";
import PageContent from "@/components/Layout/PageContent";
import CommunityPosts from "@/components/Post/CommunityPosts";
import React from "react";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import { useCommunity } from "@/features/communities/useCommunity";
import CommunityNotFound from "@/components/Community/CommunityNotFound";

const CommunityPage: React.FC = () => {
  const { community, isLoading } = useCommunity();

  if (!isLoading && !community) return <CommunityNotFound />;

  return (
    <>
      <CommunityHeader />
      <PageContent>
        <>
          <CreatePostLink />
          <CommunityPosts />
        </>
        <>
          <AboutCommunity />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;
