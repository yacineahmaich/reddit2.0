import { auth } from "@/firebase/client";
import { Post } from "@/types/global";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
import PostSidebar from "./PostSidebar";
import PostActions from "./PostActions";

type PostItemProps = {
  post: Post;
};

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const isPostDetailPage = !!router.query.postId;

  if (!post) return null;

  const navigateToPost = () => {
    if (isPostDetailPage) return;

    router.push(`${router.asPath}/${post.id}`);
  };

  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      bg="white"
      overflow="hidden"
    >
      <PostSidebar
        post={post}
        isPostDetailPage={isPostDetailPage}
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
        minH="200px"
      >
        {isPostDetailPage && user?.uid === post.creatorId && (
          <PostActions post={post} />
        )}
        <PostContent post={post} isPostDetailPage={isPostDetailPage} />
        <PostFooter post={post} />
      </Flex>
    </Flex>
  );
};

export default PostItem;
