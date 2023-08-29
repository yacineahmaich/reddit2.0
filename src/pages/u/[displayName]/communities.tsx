import ProfileLayout from "@/components/Layout/ProfileLayout";
import CommunityItem from "@/components/Profile/communities/CommunityItem";
import CommunitySkeleton from "@/components/Profile/communities/CommunitySkeleton";
import { useUserCommunities } from "@/features/profile/useUserCommunities";
import { useDirectory } from "@/features/user/useDirectory";
import { NextPageWithLayout } from "@/pages/_app";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const communities: NextPageWithLayout = () => {
  const router = useRouter();
  const displayName = router.query.displayName as string;

  const { data: communities, isLoading } = useUserCommunities(displayName);
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
      ) : (
        <>
          {communities?.map((community) => {
            return (
              <CommunityItem
                key={community.id}
                isJoined={isUserJoiningCommunity(community.id)}
                community={community}
              />
            );
          })}
        </>
      )}
    </Stack>
  );
};

communities.getLayout = (page) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default communities;
