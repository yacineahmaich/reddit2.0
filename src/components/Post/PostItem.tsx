import { Post } from "@/atoms/postsAtom";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  Image,
  HStack,
  Icon,
  Skeleton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import moment from "moment";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";

type PostItemProps = {
  post: Post;
  userIsCreator?: boolean;
  userVoteValue?: number;
  onVotePost: () => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: () => void;
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVotePost,
  onSelectPost,
  onDeletePost,
}) => {
  const [user] = useAuthState(auth);
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  async function handleDelete() {
    try {
      setIsDeleting(true);
      setError(null);
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("failed to delete post");
      }

      console.log("Post was successfully deleted");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      bg="white"
      cursor="pointer"
      onClick={onSelectPost}
      overflow="hidden"
    >
      <Flex
        direction="column"
        align="center"
        bg={"gray.100"}
        p={2}
        width="40px"
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
        />
        <Text fontSize="9pt" fontWeight={600}>
          {post.voteStatus}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
          fontSize={22}
          cursor="pointer"
        />
      </Flex>
      <Flex grow={1} direction="column" gap={4} p={4} w="full">
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
            // fontWeight={700}
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
          {user?.uid === post.creatorId && (
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
          )}
        </HStack>
      </Flex>
    </Flex>
  );
};
export default PostItem;
