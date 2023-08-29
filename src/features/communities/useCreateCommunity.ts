import { auth, firestore } from "@/firebase/client";
import { CommunityPrivacyType } from "@/types/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "firebase/auth";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

type Vars = {
  name: string;
  type: CommunityPrivacyType;
  user: User;
};

const createNewCommunity = async ({ name, type, user }: Vars) => {
  try {
    const communityDocRef = doc(firestore, "communities", name);

    await runTransaction(firestore, async (transaction) => {
      const communityDoc = await transaction.get(communityDocRef);
      if (communityDoc.exists()) {
        throw new Error(`COMMUNITY_NAME_TAKEN`);
      }

      // create community
      transaction.set(communityDocRef, {
        creatorId: user.uid,
        numOfMembers: 1,
        id: name,
        privacyType: type,
        createdAt: serverTimestamp(),
      });

      transaction.set(
        doc(firestore, `users/${user.displayName}/communitySnippets`, name),
        {
          communityId: name,
          isModerator: true,
        }
      );
    });
  } catch (error: any) {
    throw new Error(
      error.message === "COMMUNITY_NAME_TAKEN"
        ? `Sorry, r/${name} was already taken!`
        : "Something went wrong! Could not create community"
    );
  }
};

export const useCreateCommunity = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [user] = useAuthState(auth);

  return useMutation({
    mutationFn: ({ name, type }: Pick<Vars, "name" | "type">) =>
      createNewCommunity({ name, type, user: user! }),
    onSuccess: (_, { name }) => {
      router.push(`/r/${name}`);
      queryClient.invalidateQueries(["user", "directory"]);
    },
  });
};
