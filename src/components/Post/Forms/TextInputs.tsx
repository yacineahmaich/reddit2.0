import { createPostState } from "@/atoms/createPostAtom";
import { useCreatePost } from "@/features/posts/useCreatePost";
import { useUpdatePost } from "@/features/posts/useUpdatePost";
import { auth } from "@/firebase/client";
import { Post } from "@/types/global";
import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { postSchema } from "./schema";

type CreatePostValues = {
  title: string;
  body: string;
};

type Props = {
  post: Post | null;
  isEditing: boolean;
};

const TextInputs: React.FC<Props> = ({ post, isEditing }) => {
  const router = useRouter();

  const communityId = router.query.communityId as string;

  const {
    mutate: createPost,
    isLoading: isCreatigPost,
    isError,
  } = useCreatePost();

  const { mutate: updatePost, isLoading: isUpdating } = useUpdatePost();

  const [user] = useAuthState(auth);
  const [{ title, body, image }, setCreatePostState] =
    useRecoilState(createPostState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreatePostValues>({
    defaultValues: {
      title: title || post?.title,
      body: body || post?.body,
    },
    resolver: zodResolver(postSchema),
  });

  const enteredTitle = watch("title");
  const enteredBody = watch("body");

  useEffect(() => {
    setCreatePostState((state) => ({
      ...state,
      title: enteredTitle,
      body: enteredBody,
    }));
  }, [enteredTitle, enteredBody, setCreatePostState]);

  async function onSubmit(values: CreatePostValues) {
    if (!user || !communityId) return;

    // Update Post ===========>
    if (isEditing) {
      updatePost(
        {
          post: post!,
          title,
          body: body || "",
          image,
        },
        {
          onSuccess: () => router.push(`/r/${communityId}/posts/${post?.id}`),
        }
      );
      return;
    }

    // Create Post ===========>
    const postData: Post = {
      communityId,
      creatorId: user.uid,
      creatorDisplayName:
        user.displayName || (user.email!.split("@").at(0) as string),
      title: values.title,
      body: values.body,
      createdAt: serverTimestamp() as Timestamp,
      numOfComments: 0,
      numOfVotes: 0,
    };

    createPost({
      post: postData,
      image,
    });
  }

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      {isError && (
        <Box
          fontSize="10pt"
          display="flex"
          alignItems="center"
          gap={3}
          color="red.400"
          fontWeight={700}
          mb={3}
        >
          <WarningIcon fontSize="11pt" />
          <Text>something went wrong! Please try again</Text>
        </Box>
      )}
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
            disabled={isCreatigPost}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            height="34x"
            padding="8px 30px"
            isDisabled={isCreatigPost || isUpdating}
            isLoading={isCreatigPost || isUpdating}
          >
            {isEditing ? "Save" : "Post"}
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
export default TextInputs;
