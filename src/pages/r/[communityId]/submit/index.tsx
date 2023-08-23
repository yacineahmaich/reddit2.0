import AboutCommunity from "@/components/Community/AboutCommunity";
import PageContent from "@/components/Layout/PageContent";
import CreateEditPost from "@/components/Post/CreateEditPost";
import { usePost } from "@/features/posts/usePost";
import { NextPageWithLayout } from "@/pages/_app";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

const SubmitPostPage: NextPageWithLayout = () => {
  const router = useRouter();

  const postId = router.query.post as string;
  const { data: post, isLoading } = usePost(postId);

  return (
    <>
      <Box my={2}>
        <Text fontWeight={600} fontSize="12pt">
          {post || isLoading ? "Edit" : "Create"} Post
        </Text>
      </Box>
      <CreateEditPost />
    </>
  );
};

// Page Layout
SubmitPostPage.getLayout = (page) => {
  return (
    <PageContent>
      {page}
      <>
        <AboutCommunity />
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
