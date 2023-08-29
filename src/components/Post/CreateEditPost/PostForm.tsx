import ErrorMessage from "@/components/ui/ErrorMessage";
import { useCreatePost } from "@/features/posts/useCreatePost";
import { useUpdatePost } from "@/features/posts/useUpdatePost";
import { auth } from "@/firebase/client";
import useQueryParam from "@/hooks/useQueryParam";
import { Post } from "@/types/database";
import { WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { postSchema } from "./schema";
import { useRouter } from "next/router";

type PostFormProps = {
  post?: Post;
  image?: string;
};

type CreatePostValues = {
  title: string;
  body: string;
};

const PostForm: React.FC<PostFormProps> = ({ post, image }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const communityId = useQueryParam("communityId");

  const {
    mutate: createPost,
    isLoading: isUpdatingPost,
    isError: isUpdatingPostError,
  } = useCreatePost();
  const {
    mutate: updatePost,
    isLoading: isCreatingPost,
    isError: isCreatingPostError,
  } = useUpdatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostValues>({
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
    },
    resolver: zodResolver(postSchema),
  });

  const onSubmit = ({ body, title }: CreatePostValues) => {
    if (post) {
      // Update POst
      updatePost({
        post,
        body,
        title,
        image,
      });
    } else {
      // Create Post
      if (!user) return;
      const postData: Post = {
        communityId,
        creatorId: user.uid,
        creatorDisplayName: user.displayName,
        title,
        body,
        createdAt: serverTimestamp() as Timestamp,
        numOfComments: 0,
        numOfVotes: 0,
      };

      createPost({
        post: postData,
        image,
      });
    }
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      {(isUpdatingPostError || isCreatingPostError) && <ErrorMessage />}

      <Stack spacing={3}>
        <FormControl isInvalid={!!errors.title?.message}>
          <Input
            placeholder="Title"
            fontSize="10pt"
            borderRadius={4}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "gray.300",
            }}
            {...register("title")}
          />
          <FormErrorMessage fontSize="10pt" color="red.400" fontWeight={700}>
            <WarningIcon mr={2} fontSize="11pt" />
            {errors.title?.message}
          </FormErrorMessage>
        </FormControl>
        <Textarea
          placeholder="Text (Optional)"
          fontSize="10pt"
          borderRadius={4}
          _placeholder={{ color: "gray.500" }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColor: "gray.300",
          }}
          height="100px"
          {...register("body")}
        />
        <Flex justify="end" gap={3}>
          <Button
            variant="outline"
            height="34x"
            padding="8px 30px"
            onClick={() => router.back()}
            disabled={isCreatingPost}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            height="34x"
            padding="8px 30px"
            isDisabled={isCreatingPost || isUpdatingPost}
            isLoading={isCreatingPost || isUpdatingPost}
          >
            {post ? "Save" : "Post"}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
export default PostForm;
