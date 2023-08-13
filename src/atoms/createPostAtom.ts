import { atom } from "recoil";

type CreatePostState = {
  activeTab: string;
  title: string;
  body?: string;
  image?: string;
};

export const createPostState = atom<CreatePostState>({
  key: "create-post",
  default: {
    activeTab: "post",
    title: "",
    body: "",
    image: "",
  },
});
