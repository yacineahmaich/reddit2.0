import React from "react";
import { CommunitySnippet } from "@/features/user/types";
import ModeratingCommunities from "./ModeratingCommunities";
import FollowingCommunities from "./FollowingCommunities";
import CreateCommunityButton from "./CreateCommunityButton";

type CommunitiesListProps = {
  communitySnippets: CommunitySnippet[];
};

const CommunitiesList: React.FC<CommunitiesListProps> = ({
  communitySnippets,
}) => {
  return (
    <>
      <CreateCommunityButton />
      <ModeratingCommunities communitySnippets={communitySnippets} />
      <FollowingCommunities communitySnippets={communitySnippets} />
    </>
  );
};
export default CommunitiesList;
