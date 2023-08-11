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
