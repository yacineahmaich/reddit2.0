import { useCreateComment } from "@/features/posts/useCreateComment";
import { auth } from "@/firebase/client";
import { Post } from "@/types/database";
import { Button, Flex, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type CommentFormProps = {
  post: Post;
};

const CommentForm: React.FC<CommentFormProps> = ({ post }) => {
  const [user] = useAuthState(auth);
  const [body, setBody] = useState("");
  const { mutate: createComment } = useCreateComment();
  


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createComment({
      user,
      body,
      postId: post.id!,
    });
    setBody("");
  };

  return (
    <Flex direction="column" w="full">
      <form onSubmit={onSubmit}>
        <Textarea
          isRequired
          placeholder={`Comment as ${
            user?.displayName ?? user?.email?.split("@")[0]
          }`}
          _placeholder={{
            fontSize: "10pt",
          }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Flex justify="end" borderRadius={4} mt={2}>
          <Button
            type="submit"
            size="sm"
            px={30}
          >
            Comment
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
export default CommentForm;
