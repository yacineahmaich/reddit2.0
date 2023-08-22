import { atom } from "recoil";

type CreatePostAtom = {
  activeTab: string;
  title: string;
  body?: string;
  image?: string;
};

export const createPostAtom = atom<CreatePostAtom>({
  key: "create-post",
  default: {
    activeTab: "post",
    title: "",
    body: "",
    image: "",
  },
});
