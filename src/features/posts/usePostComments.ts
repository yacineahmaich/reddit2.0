import { firestore } from "@/firebase/client";
import { Comment } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";

const getPostComments = async (postId: string) => {
  const postCommentsQuery = query(
    collection(firestore, "comments"),
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
  );

  const commentDocs = await getDocs(postCommentsQuery);
  // return commentDocs
  const comments = commentDocs.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Comment)
  );

  return comments;
};

export const usePostComments = (postId: string) =>
  useQuery({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => getPostComments(postId),
    enabled: !!postId,
  });
