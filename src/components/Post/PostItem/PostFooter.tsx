import { authModalAtom } from "@/atoms/authModalAtom";
import { useSavePost } from "@/features/posts/useSavePost";
import { useSaved } from "@/features/user/useSaved";
import { auth } from "@/firebase/client";
import { Post } from "@/types/database";
import { HStack, Button } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsChat } from "react-icons/bs";
import {
  IoArrowRedoOutline,
  IoBookmark,
  IoBookmarkOutline,
} from "react-icons/io5";
import { useSetRecoilState } from "recoil";

type PostFooterProps = {
  post: Post;
};

const PostFooter: React.FC<PostFooterProps> = ({ post }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalAtom);

  const { data: savedCommunities } = useSaved();

  const { mutate: savePost } = useSavePost();

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
    }

    savePost({ displayName: user?.displayName!, postId: post.id! });
  };

  const isCreator = user?.uid === post.creatorId;
  const isSaved = savedCommunities?.find((s) => s.postId === post.id);

  return (
    <HStack ml={1} mb={0.5}>
      <Button
        leftIcon={<BsChat />}
        size="sm"
        _hover={{ bg: "gray.100" }}
        color="gray.500"
        fontSize="9pt"
        fontWeight={700}
        variant="ghost"
        borderRadius={4}
      >
        {post.numOfComments}
      </Button>
      <Button
        leftIcon={<IoArrowRedoOutline />}
        size="sm"
        _hover={{ bg: "gray.100" }}
        color="gray.500"
        fontSize="9pt"
        fontWeight={400}
        variant="ghost"
        borderRadius={4}
      >
        Share
      </Button>
      {!isCreator && (
        <Button
          leftIcon={isSaved ? <IoBookmark /> : <IoBookmarkOutline />}
          size="sm"
          _hover={{ bg: "gray.100" }}
          color="gray.500"
          fontSize="9pt"
          fontWeight={400}
          variant="ghost"
          borderRadius={4}
          onClick={handleSavePost}
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
      )}
    </HStack>
  );
};
export default PostFooter;
