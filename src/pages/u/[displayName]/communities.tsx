import ProfileLayout from "@/components/Layout/ProfileLayout";
import NoData from "@/components/Profile/NoData";
import CommunityItem from "@/components/Profile/joined-communities/JoinedCommunityItem";
import CommunitySkeleton from "@/components/Profile/joined-communities/JoinedCommunitySkeleton";
import { useUserCommunities } from "@/features/profile/useUserCommunities";
import { useDirectory } from "@/features/user/useDirectory";
import { NextPageWithLayout } from "@/pages/_app";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const JoinedCommunitiesPage: NextPageWithLayout = () => {
  const router = useRouter();
  const displayName = router.query.displayName as string;

  const { data: communities = [], isLoading } = useUserCommunities(displayName);
  const { data: communitySnippets } = useDirectory();

  const isUserJoiningCommunity = (communityId: string) => {
    const isJoined = communitySnippets?.find(
      (s) => s.communityId === communityId
    );

    return !!isJoined;
  };

  return (
    <Stack>
      {isLoading ? (
        <>
          <CommunitySkeleton />
          <CommunitySkeleton />
          <CommunitySkeleton />
          <CommunitySkeleton />
        </>
      ) : communities?.length === 0 ? (
        <NoData message="No communities found" />
      ) : (
        <>
          {communities?.map((community) => {
            return (
              <CommunityItem
                key={community.id}
                community={community}
                isJoined={isUserJoiningCommunity(community.id)}
              />
            );
          })}
        </>
      )}
    </Stack>
  );
};

JoinedCommunitiesPage.getLayout = (page) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default JoinedCommunitiesPage;
