import {
  Button,
  Flex,
  Text,
  Image,
  HStack,
  Skeleton,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChat } from "react-icons/bs";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import moment from "moment";
import { useVotePost } from "@/features/posts/useVotePost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";
import { Post } from "@/features/posts/types";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

type PostItemProps = {
  post: Post;
  userIsCreator?: boolean;
  userVoteValue?: number;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
}) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [imageIsLoading, setImageIsLoading] = useState(true);

  const [user] = useAuthState(auth);

  const { votePost, isLoading: isVoting } = useVotePost();

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
      border="1px solid"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      bg="white"
      cursor="pointer"
      overflow="hidden"
    >
      <Flex direction="column" align="center" bg="gray.100" p={2} width="40px">
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
      <Flex grow={1} direction="column" gap={2} p={4} w="full">
        <HStack>
          {/* Community Icon */}
          <Text fontSize="9pt" color="gray.300">
            Posted by u/{post.creatorDisplayName} a{" "}
            {moment(post.createdAt.toDate()).fromNow()}
          </Text>
        </HStack>
        <Text fontWeight={700} fontSize="12pt">
          {post.title}
        </Text>
        <Text fontSize="10pt">{post.body}</Text>

        {post.imageURL && (
          <Flex align="center" justify="center">
            {imageIsLoading && (
              <Skeleton height="200px" width="100%" borderRadius={4} />
            )}
            <Image
              src={post.imageURL}
              alt={post.title}
              maxHeight="460px"
              onLoad={() => setImageIsLoading(false)}
            />
          </Flex>
        )}

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
          <Button
            leftIcon={<IoBookmarkOutline />}
            size="sm"
            _hover={{ bg: "gray.100" }}
            color="gray.500"
            fontSize="9pt"
            fontWeight={400}
            variant="ghost"
            borderRadius={4}
          >
            Save
          </Button>
          {/* {user?.uid === post.creatorId && (
            <Button
              leftIcon={<DeleteIcon />}
              size="sm"
              _hover={{ bg: "gray.100" }}
              color="gray.500"
              fontSize="9pt"
              fontWeight={400}
              variant="ghost"
              borderRadius={4}
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          )} */}
        </HStack>
      </Flex>
    </Flex>
  );
};
export default PostItem;
