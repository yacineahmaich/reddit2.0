import { Post, postsState } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/client";
import { deleteDoc, doc, increment, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

export const usePosts = () => {
  const [postState, setPostState] = useRecoilState(postsState);
  const [user] = useAuthState(auth);

  const onVotePost = async (post: Post, value: number) => {
    try {
      const batch = writeBatch(firestore);
      // update user votes sub collection
      batch.set(doc(firestore, `/users/${user?.uid}/votes`, post.id!), {
        value,
      });

      batch.update(doc(firestore, "posts", post.id!), {
        voteStatus: increment(value),
      });

      console.log("VOTES SUCCESSFULLY");
    } catch (error) {
      console.log(error);
    }
  };

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
