import ProfileLayout from "@/components/Layout/ProfileLayout";
import PostsFeed from "@/components/Post/PostsFeed";
import NoData from "@/components/Profile/NoData";
import { usePersonalFeed } from "@/features/profile/usePersonalFeed";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";

const PersonalFeedPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispalyName = router.query.displayName as string;

  const { data: posts = [], isLoading } = usePersonalFeed(dispalyName);

  if (!isLoading && posts?.length === 0)
    return <NoData message="This feed is empty right now" />;

  return <PostsFeed posts={posts} isLoading={isLoading} />;
};

PersonalFeedPage.getLayout = (page) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default PersonalFeedPage;
