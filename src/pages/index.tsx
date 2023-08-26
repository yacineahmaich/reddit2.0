import PageContent from "@/components/Layout/PageContent";
import { NextPageWithLayout } from "./_app";
import PostsFeed from "@/components/Post/PostsFeed";
import { useHomeFeed } from "@/features/home/useHomeFeed";
import CreatePostLink from "@/components/Community/CreatePostLink";


const HomePage: NextPageWithLayout = () => {
  const { data: posts, isLoading } = useHomeFeed();

  return <PostsFeed posts={posts} isLoading={isLoading} isHomeFeed />;
};

HomePage.getLayout = (page) => (
  <PageContent>
    <>
      <CreatePostLink />
      {page}
    </>
    <>{/* COmuunities */}</>
  </PageContent>
);

export default HomePage;
