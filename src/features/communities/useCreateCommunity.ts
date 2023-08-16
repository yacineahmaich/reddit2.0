import { auth, firestore } from "@/firebase/client";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { CommunityPrivacyType } from "@/types/global";

type Vars = {
  name: string;
  type: CommunityPrivacyType;
  userId: string;
};

const createNewCommunity = async ({ name, type, userId }: Vars) => {
  const communityDocRef = doc(firestore, "communities", name);

  await runTransaction(firestore, async (transaction) => {
    const communityDoc = await transaction.get(communityDocRef);
    if (communityDoc.exists()) {
      throw new Error(`Sorry, r/${name} is taken, Try another.`);
    }

    // create community
    transaction.set(communityDocRef, {
      creatorId: userId,
      numMembers: 1,
      name,
      privacyType: type,
      createdAt: serverTimestamp(),
    });

    transaction.set(doc(firestore, `users/${userId}/communitySnippets`, name), {
      communityId: name,
      isModerator: true,
    });
  });
};

export const useCreateCommunity = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user] = useAuthState(auth);

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: ({ name, type }: Pick<Vars, "name" | "type">) =>
      createNewCommunity({ name, type, userId: user?.uid! }),
    onSuccess: (_, { name }) => {
      router.push(`/r/${name}`);
      queryClient.invalidateQueries(["user", "snippets"]);
    },
  });

  return {
    createCommunity,
    isLoading,
  };
};
