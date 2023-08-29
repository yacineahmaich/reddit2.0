import AboutCommunity from "@/components/Community/AboutCommunity";
import PageContent from "@/components/Layout/PageContent";
import CreateEditPost from "@/components/Post/CreateEditPost";
import { usePost } from "@/features/posts/usePost";
import { auth } from "@/firebase/client";
import useQueryParam from "@/hooks/useQueryParam";
import { NextPageWithLayout } from "@/pages/_app";
import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const SubmitPostPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const postId = useQueryParam("post");
  const { data: post, isLoading } = usePost(postId);

  if (!user || (postId && post?.creatorId !== user.uid)) {
    router.push("/");
    return;
  }

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
