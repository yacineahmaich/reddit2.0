    import { firestore } from "@/firebase/client";
import { Post } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const getHomeFeed = async () => {
  const homeFeedQuery = query(
    collection(firestore, "posts"),
    orderBy("numOfVotes", "desc"),
    limit(10)
  );

  const homeFeedDocs = await getDocs(homeFeedQuery);

  const homeFeedPosts = homeFeedDocs.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Post)
  );

  return homeFeedPosts;
};

export const useHomeFeed = () =>
  useQuery({
    queryKey: ["feed"],
    queryFn: getHomeFeed,
  });
