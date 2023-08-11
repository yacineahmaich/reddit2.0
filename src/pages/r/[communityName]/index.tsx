import { Community } from "@/atoms/communitiesAtom";
import NotFound from "@/components/Community/CommunityNotFound";
import Header from "@/components/Community/Header";
import { firestore } from "@/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";

type CommunityPageProps = {
  community: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ community }) => {
  console.log(community);

  if (!community) return <NotFound />;

  return (
    <>
      <Header community={community} />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityName = context.query?.communityName;

    const communityDocRef = doc(
      firestore,
      "communities",
      communityName as string
    );

    const communityDoc = await getDoc(communityDocRef);
    const community = {
      id: communityDoc.id,
      ...communityDoc.data(),
    };

    // if (!community)
    //   return {
    //     notFound: true,
    //   };

    return {
      props: {
        community: communityDoc.exists() && community,
      },
    };
  } catch (error) {
    console.error("CommunityPage getServerSideProps", error);
  }
}

export default CommunityPage;
