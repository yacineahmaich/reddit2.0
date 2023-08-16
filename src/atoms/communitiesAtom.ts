import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

// export type CommunityPrivacyType = "public" | "restricted" | "private";
export enum CommunityPrivacyType {
  PUBLIC = "public",
  RESTRICTED = "restricted",
  PRIVATE = "private",
}

export type Community = {
  id: string;
  creatorId: string;
  numMembers: number;
  privacyType: CommunityPrivacyType;
  createdAt?: Timestamp;
  imageURL?: string;
};

export type CommunitySnippet = {
  communityId: string;
  isModeratot?: boolean;
  imageURL?: string;
};

export type CommunityState = {
  mySnippts: CommunitySnippet[];
  currentCommunity?: Community;
};

export const communityState = atom<CommunityState>({
  key: "communityState",
  default: {
    mySnippts: [],
  },
});
