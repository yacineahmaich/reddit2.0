import { authModalAtom } from "@/atoms/authModalAtom";
import { useVotePost } from "@/features/posts/useVotePost";
import { useUserVotes } from "@/features/user/useUserVotes";
import { Post } from "@/types/global";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  IoArrowUpCircleSharp,
  IoArrowUpCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowDownCircleOutline,
} from "react-icons/io5";
import { useSetRecoilState } from "recoil";

type PostSidebarProps = {
  isPostDetailPage: boolean;
  user?: User | null;
  post: Post;
};

export const PostSidebar: React.FC<PostSidebarProps> = ({
  isPostDetailPage,
  user,
  post,
}) => {
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const { data: userVotes } = useUserVotes();
  const { mutate: votePost, isLoading: isVoting } = useVotePost();

  const userVoteValue =
    userVotes?.find((v) => v.postId === post?.id)?.vote ?? 0;

  function handleVotePost(vote: number) {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    votePost({
      post,
      userId: user?.uid!,
      vote,
    });
  }

  return (
    <Flex
      direction="column"
      align="center"
      bg={isPostDetailPage ? "white" : "gray.100"}
      p={2}
      width="40px"
    >
      <IconButton
        variant="ghost"
        aria-label="Upvote Post"
        isDisabled={isVoting}
        icon={
          userVoteValue === 1 ? (
            <IoArrowUpCircleSharp />
          ) : (
            <IoArrowUpCircleOutline />
          )
        }
        color={userVoteValue === 1 ? "brand.100" : "gray.400"}
        fontSize={22}
        cursor="pointer"
        onClick={() => handleVotePost(1)}
      />
      <Text fontSize="9pt" fontWeight={600}>
        {post.numOfVotes}
      </Text>
      <IconButton
        aria-label="Downvote Post"
        isDisabled={isVoting}
        variant="ghost"
        icon={
          userVoteValue === -1 ? (
            <IoArrowDownCircleSharp />
          ) : (
            <IoArrowDownCircleOutline />
          )
        }
        color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
        fontSize={22}
        cursor="pointer"
        onClick={() => handleVotePost(-1)}
      />
    </Flex>
  );
};

export default PostSidebar;