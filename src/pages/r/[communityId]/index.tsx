import AboutCommunity from "@/components/Community/AboutCommunity";
import CommunityHeader from "@/components/Community/CommunityHeader";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import PageContent from "@/components/Layout/PageContent";
import { useCommunity } from "@/features/communities/useCommunity";
import React from "react";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import { NextPageWithLayout } from "@/pages/_app";
import { useCommunityPosts } from "@/features/communities/useCommunityPosts";
import PostsFeed from "@/components/Post/PostsFeed";
import Head from "next/head";
import { Button, Flex, Text } from "@chakra-ui/react";
import { IoMdCreate } from "react-icons/io";
import Link from "next/link";

const CommunityPage: NextPageWithLayout = () => {
  const { community, isLoading: isCommunityLoading } = useCommunity();
  const { data: posts, isLoading: isCommunityPostsLoading } =
    useCommunityPosts();

  if (!isCommunityLoading && !community) return <CommunityNotFound />;

  if (posts?.length === 0)
    return (
      <Flex
        bg="white"
        minH="200px"
        align="center"
        justify="center"
        borderRadius={4}
        border="1px solid"
        borderColor="gray.200"
        direction="column"
      >
        <Text fontSize="11pt" color="gray.500">
          There no posts in the community yet ?
        </Text>
        <Text fontSize="11pt" color="gray.500">
          Be the first one to post on it !
        </Text>
        <Button
          leftIcon={<IoMdCreate />}
          mt={4}
          variant="ghost"
          size="xs"
          px={30}
          color="blue.400"
          as={Link}
          href={`/r/${community.id}/submit`}
        >
          Post Now
        </Button>
      </Flex>
    );

  return (
    <>
      <Head>
        <title>r / {community?.id}</title>
      </Head>
      <PostsFeed
        posts={posts}
        isLoading={isCommunityPostsLoading}
        isCommunityFeed
      />
    </>
  );
};

// Page Layout
CommunityPage.getLayout = (page) => {
  return (
    <>
      <CommunityHeader />
      <PageContent>
        <>
          <CreatePostLink />
          {page}
        </>
        <>
          <AboutCommunity />
        </>
      </PageContent>
    </>
  );
};

export default CommunityPage;
