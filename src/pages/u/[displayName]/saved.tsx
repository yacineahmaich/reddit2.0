import ProfileLayout from "@/components/Layout/ProfileLayout";
import PostsFeed from "@/components/Post/PostsFeed";
import NoData from "@/components/Profile/NoData";
import { useUserSavedPosts } from "@/features/profile/useUserSavedPosts";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import React from "react";

const SavedPage: NextPageWithLayout = () => {
  const router = useRouter();
  const displayName = router.query.displayName as string;

  const { data: savedPosts = [], isLoading } = useUserSavedPosts(displayName);

  if (!isLoading && savedPosts?.length === 0)
    return (
      <NoData message="Nothing in Your Saved Posts Yet! Begin Bookmarking Great Content to Build Your Collection. " />
    );

  return <PostsFeed posts={savedPosts} isLoading={isLoading} isSavedPage />;
};

SavedPage.getLayout = (page) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};
export default SavedPage;
