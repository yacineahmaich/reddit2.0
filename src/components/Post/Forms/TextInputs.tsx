import { createPostState } from "@/atoms/createPostAtom";
import { auth } from "@/firebase/client";
import {
  Button,
  Flex,
  Input,
  Stack,
  Textarea,
  FormControl,
  FormErrorMessage,
  Box,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp, serverTimestamp } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useResetRecoilState } from "recoil";
import { postSchema } from "./schema";
import { WarningIcon } from "@chakra-ui/icons";
import { Post } from "@/atoms/postsAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useCreatePost } from "@/features/posts/useCreatePost";
import { useCommunity } from "@/features/communities/useCommunity";

type CreatePostValues = {
  title: string;
  body: string;
};

const TextInputs: React.FC = () => {
  const router = useRouter();
  const { community, isLoading: isCommunityLoading } = useCommunity(
    router.query.id as string
  );
  const { createPost, isLoading, isError } = useCreatePost();

  const [user] = useAuthState(auth);
  const resetCreatePostState = useResetRecoilState(createPostState);
  const [{ title, body, image }, setCreatePostState] =
    useRecoilState(createPostState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreatePostValues>({
    defaultValues: {
      title,
      body,
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
    if (!user || !community) return;

    const post: Post = {
      communityId: community.id,
      creatorId: user.uid,
      creatorDisplayName:
        user.displayName || (user.email!.split("@").at(0) as string),
      title: values.title,
      body: values.body,
      createdAt: serverTimestamp() as Timestamp,
      numOfComments: 0,
      voteStatus: 0,
    };

    createPost(
      {
        post,
        image,
      },
      {
        // reset createPost atom state when create post successed
        onSuccess: () => {
          resetCreatePostState();
        },
      }
    );
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
        <FormControl
          isInvalid={!!errors.title?.message}
          isDisabled={isCommunityLoading}
        >
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
          isDisabled={isCommunityLoading}
        />
        <Flex justify="end" gap={3}>
          <Button
            variant="outline"
            height="34x"
            padding="8px 30px"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            height="34x"
            padding="8px 30px"
            onClick={() => null}
            isDisabled={isLoading || isCommunityLoading}
            isLoading={isLoading}
          >
            Post
          </Button>
        </Flex>
      </Stack>
    </form>
  );
};
export default TextInputs;