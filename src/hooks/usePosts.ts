import { postsState } from "@/atoms/postsAtom";
import { useRecoilState } from "recoil";

export const usePosts = () => {
  const [postState, setPostState] = useRecoilState(postsState);

  const onVotePost = () => {};
  const onSelectPost = () => {};

  const onDeletePost = async () => {};

  return {
    postState,
    setPostState,
    onVotePost,
    onSelectPost,
    onDeletePost,
  };
};
