import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type CommunityPrivacyType = "public" | "restricted" | "private";

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
};

export const communityState = atom<CommunityState>({
  key: "communityState",
  default: {
    mySnippts: [],
  },
});
