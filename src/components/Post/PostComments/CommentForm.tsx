import { authModalAtom } from "@/atoms/authModalAtom";
import { useCreateComment } from "@/features/posts/useCreateComment";
import { auth } from "@/firebase/client";
import { getUserNameFromUserObj } from "@/firebase/helpers";
import { Post } from "@/types/database";
import { Button, Flex, Textarea, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type CommentFormProps = {
  post: Post;
};

const CommentForm: React.FC<CommentFormProps> = ({ post }) => {
  const [user] = useAuthState(auth);
  const [body, setBody] = useState("");
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const { mutate: createComment } = useCreateComment();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return setAuthModalState({ open: true, view: "login" });
    }

    createComment({
      user,
      body,
      postId: post.id!,
    });
    setBody("");
  };

  return (
    <Flex direction="column" w="full">
      <Tooltip
        label="Please login or register to be able to comment"
        placement="top-start"
        borderRadius={4}
        bg="orange"
        fontWeight={700}
      >
        <form onSubmit={onSubmit}>
          <Textarea
            isRequired
            placeholder={
              user
                ? `Comment as ${getUserNameFromUserObj(user!)}`
                : "You should be logged in!"
            }
            _placeholder={{
              fontSize: "10pt",
            }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            isDisabled={!user?.uid}
            _disabled={{
              cursor: "auto",
            }}
          />
          <Flex justify="end" borderRadius={4} mt={2}>
            <Button type="submit" size="sm" px={30} isDisabled={!user?.uid}>
              Comment
            </Button>
          </Flex>
        </form>
      </Tooltip>
    </Flex>
  );
};
export default CommentForm;
