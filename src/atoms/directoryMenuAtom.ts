import { atom } from "recoil";

type DirectoryMenuAtom = {
  createCommunityOpen: boolean;
  menuOpen: boolean;
};

export const directoryMenuAtom = atom<DirectoryMenuAtom>({
  key: "createCommunityModalAtom",
  default: {
    createCommunityOpen: false,
    menuOpen: false,
  },
});
