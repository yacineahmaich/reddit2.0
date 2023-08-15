import { Community, communityState } from "@/atoms/communitiesAtom";
import CommunityNotFound from "@/components/Community/CommunityNotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import { firestore } from "@/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import CommunityPosts from "@/components/Post/CommunityPosts";
import { Flex, Box, Text, Divider, Button, IconButton } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import moment from "moment";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import AboutCommunity from "@/components/Community/AboutCommunity";
import { useSetRecoilState } from "recoil";

type CommunityPageProps = {
  community: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ community }) => {
  const setCommunityState = useSetRecoilState(communityState);

  console.log(community);

  useEffect(() => {
    setCommunityState((state) => ({
      ...state,
      currentCommunity: community,
    }));

    () =>
      setCommunityState((state) => ({
        ...state,
        currentCommunity: undefined,
      }));
  }, [community, setCommunityState]);

  if (!community) return <CommunityNotFound />;
  return (
    <>
      <Header community={community} />
      <PageContent>
        <>
          <CreatePostLink />
          <CommunityPosts community={community} />
        </>
        <>
          <AboutCommunity community={community} />
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityId = context.query?.communityId;

    const communityDocRef = doc(
      firestore,
      "communities",
      communityId as string
    );

    const communityDoc = await getDoc(communityDocRef);
    const community = {
      id: communityDoc.id,
      ...communityDoc.data(),
    };

    if (!community)
      return {
        notFound: true,
      };

    return {
      props: {
        community:
          communityDoc.exists() && JSON.parse(JSON.stringify(community)),
      },
    };
  } catch (error) {
    console.error("CommunityPage getServerSideProps", error);
  }
}

export default CommunityPage;
