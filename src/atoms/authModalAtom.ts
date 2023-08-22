import { atom } from "recoil";

export type AuthModalAtom = {
  open: boolean;
  view: "login" | "signup" | "resetPassword";
};

export const authModalAtom = atom<AuthModalAtom>({
  key: "authModalAtom",
  default: {
    open: false,
    view: "login",
  },
});
