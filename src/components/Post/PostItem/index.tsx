import { auth } from "@/firebase/client";
import { Post } from "@/types/database";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostSidebar from "./PostSidebar";
import PostActions from "./PostActions";

type PostItemProps = {
  post: Post;
  isSinglePostPage?: boolean;
  isCommunityFeed?: boolean;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  isSinglePostPage,
  isCommunityFeed,
}) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const navigateToPost = () => {
    if (isSinglePostPage) return;

    router.push(`/r/${post.communityId}/${post.id}`);
  };

  if (!post) return null;

  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      borderBottomColor={isSinglePostPage ? "transparent" : "gray.300"}
      borderRadius={isSinglePostPage ? "4px 4px 0 0 " : 4}
      _hover={{ borderColor: isSinglePostPage ? "none" : "gray.500" }}
      bg="white"
    >
      <PostSidebar
        post={post}
        isSinglePostPage={isSinglePostPage}
        user={user}
      />
      <Flex
        grow={1}
        direction="column"
        gap={2}
        p={4}
        w="full"
        onClick={navigateToPost}
        position="relative"
        cursor={isSinglePostPage ? "auto" : "pointer"}
      >
        {isSinglePostPage && user?.uid === post.creatorId && (
          <PostActions post={post} />
        )}
        <PostContent
          post={post}
          isSinglePostPage={isSinglePostPage}
          isCommunityFeed={isCommunityFeed}
        />
        <PostFooter post={post} />
      </Flex>
    </Flex>
  );
};

export default PostItem;
