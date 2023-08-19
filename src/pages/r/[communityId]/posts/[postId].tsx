import AboutCommunity from "@/components/Community/AboutCommunity";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Post/PostItem";
import { getPost } from "@/features/posts/usePost";
import { useUserVotes } from "@/features/user/useUserVotes";
import { Post } from "@/types/global";
import { parseObj } from "@/utils/helpers";
import { GetServerSidePropsContext } from "next";
import React from "react";

type PostPageProps = {
  post: Post;
};

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  const { data: votes } = useUserVotes();

  const postVote = votes?.find((v) => v.postId === post.id);
  const userVoteValue = postVote ? postVote.vote : 0;

  return (
    <PageContent>
      <>
        <PostItem post={post} userVoteValue={userVoteValue} />
      </>
      <>
        <AboutCommunity />
      </>
    </PageContent>
  );
};
export default PostPage;

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const postId = query.postId as string;

  const post = await getPost(postId);

  return {
    props: {
      post: parseObj(post),
    },
  };
}
