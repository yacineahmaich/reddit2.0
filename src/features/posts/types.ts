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
