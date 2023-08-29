import { firestore } from "@/firebase/client";
import { Post } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const getPersonalFeed = async (dispalyName: string) => {
  const personalFeedQuery = query(
    collection(firestore, "posts"),
    where("creatorDisplayName", "==", dispalyName),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  const personalFeedDocs = await getDocs(personalFeedQuery);

  const personalFeedPosts = personalFeedDocs.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Post)
  );

  return personalFeedPosts;
};

export const usePersonalFeed = (dispalyName: string) => {
  return useQuery({
    queryKey: ["personal-feed", dispalyName],
    queryFn: () => getPersonalFeed(dispalyName),
    enabled: !!dispalyName,
  });
};
