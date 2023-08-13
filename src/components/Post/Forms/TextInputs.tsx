import { createPostState } from "@/atoms/createPostAtom";
import { auth, firestore, storage } from "@/firebase/client";
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
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useResetRecoilState } from "recoil";
import { postSchema } from "./schema";
import { WarningIcon } from "@chakra-ui/icons";
import { Post } from "@/atoms/postsAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type CreatePostValues = {
  title: string;
  body: string;
};

const TextInputs: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [{ title, body, image }, setCreatePostState] =
    useRecoilState(createPostState);
  const resetCreatePostState = useResetRecoilState(createPostState);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CreatePostValues>({
    defaultValues: {
      title,
      body,
    },
    resolver: zodResolver(postSchema),
  });

  async function onSubmit(values: CreatePostValues) {
    if (!user) return;

    try {
      setIsLoading(true);
      // create post
      const newPost: Post = {
        communityId: router.query.communityId as string,
        creatorId: user?.uid,
        creatorDisplayName:
          user.displayName || (user.email!.split("@").at(0) as string),
        title: values.title,
        body: values.body,
        createdAt: serverTimestamp() as Timestamp,
        numOfComments: 0,
        voteStatus: 0,
      };

      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);

      if (image) {
        const imageRef = ref(storage, `/posts/${postDocRef.id}/image`);
        await uploadString(imageRef, image, "data_url");

        const imageDownloadURL = await getDownloadURL(imageRef);

        await updateDoc(postDocRef, {
          imageURL: imageDownloadURL,
        });

        resetCreatePostState();
        router.back();
      }
    } catch (error) {
      setError("something went wrong! Please try again");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // save inputs state in the atom when navigating away
    return () => {
      const { title, body } = getValues();

      setCreatePostState((state) => ({
        ...state,
        title,
        body,
      }));
    };
  }, [getValues, setCreatePostState]);

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      {error && (
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
          <Text>{error}</Text>
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
        <Flex justify="end">
          <Button
            type="submit"
            height="34x"
            padding="8px 30px"
            onClick={() => null}
            disabled={false}
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
