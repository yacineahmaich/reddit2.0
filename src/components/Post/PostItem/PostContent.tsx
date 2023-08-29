import Avatar from "@/components/ui/Avatar";
import { getStorageDownloadUrl } from "@/firebase/helpers";
import { Post } from "@/types/database";
import { Box, Flex, Icon, Image, Skeleton, Text } from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";

type PostContentProps = {
  post: Post;
  isSinglePostPage?: boolean;
  isCommunityFeed?: boolean;
};

const PostContent: React.FC<PostContentProps> = ({
  post,
  isSinglePostPage,
  isCommunityFeed,
}) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const created = moment(post.createdAt.seconds * 1000).fromNow();

  return (
    <>
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "start", sm: "center" }}
        gap={{ base: 2, md: 0 }}
      >
        {!isCommunityFeed && (
          <Flex align="center">
            <Flex align="center" gap={2}>
              <Avatar
                source={getStorageDownloadUrl(
                  `communities/${post.communityId}`
                )}
                alt={post.communityId}
                size={7}
              />
              <Text
                fontSize="10pt"
                _hover={{ textDecoration: "underline" }}
                fontWeight={600}
                as={Link}
                href={`/r/${post.communityId}`}
                onClick={(e) => e.stopPropagation()}
              >
                r/{post.communityId}
              </Text>
            </Flex>
            <Icon as={BsDot} fontSize={10} color="gray.500" />
          </Flex>
        )}
        <Text fontSize="9pt" color="gray.300">
          Posted by{" "}
          <Text
            display="inline"
            as={Link}
            href={`/u/${post.creatorDisplayName}`}
            _hover={{
              textDecoration: "underline",
              color: "gray.700",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            u/{post.creatorDisplayName}
          </Text>{" "}
          a {created}
        </Text>
      </Flex>
      <Text fontWeight={700} fontSize="12pt">
        {post.title}
      </Text>
      <Text fontSize="10pt">{post.body}</Text>

      {post.imageURL && (
        <Flex align="center" justify="center">
          {imageIsLoading && (
            <Skeleton
              height={isSinglePostPage ? "250px" : "200px"}
              borderRadius={4}
              width="100%"
            />
          )}
          <Image
            src={post.imageURL}
            alt={post.title}
            maxHeight="480px"
            borderRadius={4}
            w="full"
            objectFit="cover"
            onLoad={() => setImageIsLoading(false)}
            hidden={imageIsLoading}
          />
        </Flex>
      )}
    </>
  );
};
export default PostContent;
