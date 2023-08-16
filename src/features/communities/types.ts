import { Timestamp } from "firebase/firestore";

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
