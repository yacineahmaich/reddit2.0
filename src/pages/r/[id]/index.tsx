import AboutCommunity from "@/components/Community/AboutCommunity";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import CommunityPosts from "@/components/Post/CommunityPosts";
import React from "react";
import CreatePostLink from "../../../components/Community/CreatePostLink";

const CommunityPage: React.FC = () => {
  return (
    <>
      <Header />
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
