import PageContent from "@/components/Layout/PageContent";
import { NextPageWithLayout } from "./_app";
import PostsFeed from "@/components/Post/PostsFeed";
import { useHomeFeed } from "@/features/home/useHomeFeed";
import CreatePostLink from "@/components/Community/CreatePostLink";
import TopCommunities from "@/components/Home/TopCommunities";
import RedditPremium from "@/components/Home/RedditPremium";
import { Stack } from "@chakra-ui/react";
import CreateSomething from "@/components/Home/CreateSomething";

const HomePage: NextPageWithLayout = () => {
  const { data: posts, isLoading } = useHomeFeed();

  return <PostsFeed posts={posts} isLoading={isLoading} />;
};

HomePage.getLayout = (page) => (
  <PageContent>
    <>
      <CreatePostLink />
      {page}
    </>
    <>
      <Stack position="sticky" top="14px">
        <TopCommunities />
        <RedditPremium />
        <CreateSomething />
      </Stack>
    </>
  </PageContent>
);

export default HomePage;
