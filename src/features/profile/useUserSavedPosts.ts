import { firestore } from "@/firebase/client";
import { Post, SavedPost } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

const getSavedPosts = async (displayName: string) => {
  const userSavedPostsDocs = await getDocs(
    query(collection(firestore, `users/${displayName}/saved`))
  );
  const savedPosts = userSavedPostsDocs.docs.map(
    (doc) => doc.data() as SavedPost
  );

  const postIds = savedPosts.map((snippet) => snippet.postId);
console.log(postIds)
  const postDocs = await getDocs(
    query(collection(firestore, "posts"), where("id", "in", postIds), limit(10))
  );
    
  const posts = postDocs.docs
    .map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Post)
    )
    .sort((a, b) => {
      const post1 = savedPosts.find((post) => post.postId === a.id);
      const post2 = savedPosts.find((post) => post.postId === b.id);

      //@ts-ignore
      return post1?.savedAt > post2?.savedAt ? -1 : 1;
    });

  return posts;
};

export const useUserSavedPosts = (displayName: string) =>
  useQuery({
    queryKey: ["user-saved", displayName],
    queryFn: () => getSavedPosts(displayName),
  });
