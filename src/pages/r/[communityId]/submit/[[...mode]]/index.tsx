import PageContent from "@/components/Layout/PageContent";
import PostForm from "@/components/Post/PostForm";
import { getPost } from "@/features/posts/usePost";
import { Post } from "@/types/global";
import { parseObj } from "@/utils/helpers";
import { Box, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

type SubmitPostPageProps = {
  post: Post | null;
  isEditing: boolean;
};

const SubmitPostPage: React.FC<SubmitPostPageProps> = ({ post, isEditing }) => {
  return (
    <PageContent>
      <>
        <Box p="14px 0" borderBottom="1px solid" borderColor="white">
          <Text>{isEditing ? "Edit" : "Create"} Post</Text>
        </Box>
        <PostForm post={post} isEditing={isEditing} />
      </>
      <>{/* <AboutCommunity /> */}</>
    </PageContent>
  );
};

export default SubmitPostPage;

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const [postId, mode] = (query.mode as string[]) ?? [];

  const isEditing = !!postId && mode === "edit";

  if (!isEditing) {
    return {
      props: {
        post: null,
        isEditing: false,
      },
    };
  }

  const post = await getPost(postId);

  return {
    props: {
      post: parseObj(post),
      isEditing,
    },
  };
}
