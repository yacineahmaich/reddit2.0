import { firestore } from "@/firebase/client";
import { Community } from "@/types/database";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

const getTopCommunities = async () => {
  const topCommunitiesQuery = query(
    collection(firestore, "communities"),
    orderBy("numOfMembers", "desc"),
    limit(5)
  );

  const topCommunitiesDocs = await getDocs(topCommunitiesQuery);

  const topCommunities = topCommunitiesDocs.docs.map(
    (doc) => doc.data() as Community
  );

  return topCommunities;
};

export const useTopCommunities = () =>
  useQuery({
    queryKey: ["top-communities"],
    queryFn: getTopCommunities,
  });
