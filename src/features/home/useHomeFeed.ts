import { auth, firestore } from "@/firebase/client";
import { Post } from "@/types/database";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DocumentData,
  Query,
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDirectory } from "../user/useDirectory";

const getHomeFeed = async (communityIds: string[]) => {
  let homeFeedQuery: Query<DocumentData, DocumentData>;
  if (communityIds.length > 0) {
    homeFeedQuery = query(
      collection(firestore, "posts"),
      where("communityId", "in", communityIds),
      orderBy("createdAt", "desc"),
      limit(10)
    );
  } else {
    homeFeedQuery = query(
      collection(firestore, "posts"),
      orderBy("numOfVotes", "desc"),
      limit(10)
    );
  }

  let homeFeedDocs: QuerySnapshot<DocumentData, DocumentData>;

  homeFeedDocs = await getDocs(homeFeedQuery);

  if (communityIds.length > 0 && homeFeedDocs.size === 0) {
    homeFeedDocs = await getDocs(
      query(
        collection(firestore, "posts"),
        orderBy("numOfVotes", "desc"),
        limit(10)
      )
    );
  }

  const homeFeedPosts = homeFeedDocs.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Post)
  );

  return homeFeedPosts;
};

export const useHomeFeed = () => {
  const queryClient = useQueryClient();
  const [user] = useAuthState(auth);
  const { data: snippets, isSuccess } = useDirectory(user!);

  const communityIds = snippets?.map((s) => s.communityId) ?? [];

  return useQuery({
    queryKey: ["feed", user?.uid ?? "public"],
    queryFn: () => getHomeFeed(communityIds),
    onSuccess: (posts) => {
      // add post to single single doc cache
      posts.forEach((post) =>
        queryClient.setQueryData(["posts", post.id], post)
      );
    },
    enabled: (user && isSuccess) || !user,
  });
};
