import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Post = {
  id?: string;
  communityId: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  body: string;
  numOfComments: number;
  voteStatus: number;
  imageURL?: string;
  communityImageURL?: string;
  createdAt: Timestamp;
};

type PostsState = {
  selectedPost: Post | null;
  allPosts: Post[];
};

export const postsState = atom<PostsState>({
  key: "posts",
  default: {
    selectedPost: null,
    allPosts: [],
  },
});
