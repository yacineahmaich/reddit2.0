import React, { useState } from "react";
import { HStack, Flex, Skeleton, Text, Image } from "@chakra-ui/react";
import { Post } from "@/types/database";
import moment from "moment";

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
        {/* Community Icon */}
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
            <Skeleton height={isSinglePostPage ? "250px" : "200px"} my={6} width="100%" />
          )}
          <Image
            src={post.imageURL}
            alt={post.title}
            maxHeight="460px"
            onLoad={() => setImageIsLoading(false)}
          />
        </Flex>
      )}
    </>
  );
};
export default PostContent;
