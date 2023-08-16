import { Timestamp } from "firebase/firestore";

export type Post = {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numOfComments: number;
  numOfVotes: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
};

export type CommunitySnippet = {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
};

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
