import { auth, firestore } from "@/firebase/client";
import { Community } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const getTopCommunities = async (userId: string) => {
  const topCommunitiesQuery = query(
    collection(firestore, "communities"),
    orderBy("creatorId"),
    orderBy("numOfMembers", "desc"),
    where("creatorId", "!=", userId),
    limit(5)
  );

  const topCommunitiesDocs = await getDocs(topCommunitiesQuery);

  const topCommunities = topCommunitiesDocs.docs.map(
    (doc) => doc.data() as Community
  );

  return topCommunities;
};

export const useTopCommunities = () => {
  const [user] = useAuthState(auth);

  return useQuery({
    queryKey: ["top-communities"],
    queryFn: () => getTopCommunities(user?.uid!),
    enabled: !!user?.uid,
  });
};
