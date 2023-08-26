import React, { useState } from "react";
import { HStack, Flex, Skeleton, Text, Image } from "@chakra-ui/react";
import { Post } from "@/types/database";
import moment from "moment";
import Avatar from "@/components/ui/Avatar";
import { getStorageDownloadUrl } from "@/firebase/helpers";

type PostContentProps = {
  post: Post;
  isSinglePostPage: boolean;
};

const PostContent: React.FC<PostContentProps> = ({
  post,
  isSinglePostPage,
}) => {
  const [imageIsLoading, setImageIsLoading] = useState(true);
  const created = moment(post.createdAt.seconds * 1000).fromNow();

  return (
    <>
      <HStack>
        <Avatar
          source={getStorageDownloadUrl(`communities/${post.communityId}`)}
          alt={post.communityId}
          size={8}
        />
        <Text fontSize="9pt" color="gray.300">
          Posted by u/{post.creatorDisplayName} a {created}
        </Text>
      </HStack>
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
