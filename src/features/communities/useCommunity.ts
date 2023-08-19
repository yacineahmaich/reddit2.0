import { firestore } from "@/firebase/client";
import { Community } from "@/types/global";
import { parseObj } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

async function getCommunity(id: string): Promise<Community | null> {
  const communityDocRef = doc(firestore, "communities", id);

  const communityDoc = await getDoc(communityDocRef);
  const community = {
    id: communityDoc.id,
    ...communityDoc.data(),
  } as Community;

  return communityDoc.exists() ? parseObj<Community>(community) : null;
}

export function useCommunity() {
  const router = useRouter();
  const communityId = router.query.communityId as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["community", communityId],
    queryFn: () => getCommunity(communityId),
    enabled: !!communityId,
  });

  return {
    community: data!,
    isLoading,
    isError,
  };
}
