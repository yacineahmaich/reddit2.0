import { Post, postsState } from "@/atoms/postsAtom";
import { firestore, storage } from "@/firebase/client";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";

export const usePosts = () => {
  const [postState, setPostState] = useRecoilState(postsState);

  const onVotePost = () => {};
  const onSelectPost = () => {};

  const onDeletePost = async (post: Post) => {
    // check if post has an image
    if (post.imageURL) {
      const imageRef = ref(storage, `posts/${post.id}/image`);
      await deleteObject(imageRef);
    }
    // delete post
    await deleteDoc(doc(firestore, "posts", post.id!));

    // update recoil state
    setPostState((state) => ({
      ...state,
      allPosts: state.allPosts.filter((p) => p.id !== post.id),
    }));

    return true;
  };

  return {
    postState,
    setPostState,
    onVotePost,
    onSelectPost,
    onDeletePost,
  };
};
