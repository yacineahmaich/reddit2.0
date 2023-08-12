import { authModalState } from "@/atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/client";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

export function useCommunityData() {
  const [user] = useAuthState(auth);
  const setAuthModal = useSetRecoilState(authModalState);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  useEffect(() => {
    if (!user) return;

    const getMySnippets = async () => {
      try {
        setError("");

        const snippetDocs = await getDocs(
          collection(firestore, `users/${user?.uid}/communitySnippets`)
        );

        const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));

        setCommunityStateValue((state) => ({
          ...state,
          mySnippts: snippets as CommunitySnippet[],
        }));
      } catch (error) {
        setError("Something went wrong could not get communities!");
      }
    };

    getMySnippets();
  }, [user, setCommunityStateValue]);

  const isJoinedCommunity = (communityId: string) => {
    return Boolean(
      communityStateValue.mySnippts.find((c) => c.communityId === communityId)
    );
  };

  const joinOrLeaveCommunity = (community: Community, isJoined: boolean) => {
    if (!user) {
      setAuthModal({ open: true, view: "login" });
      return;
    }

    if (isJoined) {
      leaveCommunity(community.id);
      return;
    } else {
      joinCommunity(community);
    }
  };

  const joinCommunity = async (community: Community) => {
    try {
      setError("");
      setIsLoading(true);
      const batch = writeBatch(firestore);

      const newSnippet = {
        communityId: community.id,
        imageURL: community.imageURL || "",
      };

      // update user communitySnippets
      batch.set(
        doc(firestore, `users/${user?.uid}/communitySnippets`, community.id),
        newSnippet
      );

      // update community number of members
      batch.update(doc(firestore, "communities", community.id), {
        numMembers: increment(1),
      });

      await batch.commit();

      setCommunityStateValue((state) => ({
        ...state,
        mySnippts: [...state.mySnippts, newSnippet],
      }));
    } catch (error: any) {
      console.log("join community error", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const leaveCommunity = async (communityId: string) => {
    try {
      setError("");
      setIsLoading(true);
      const batch = writeBatch(firestore);

      // update community number of members
      batch.update(doc(firestore, "communities", communityId), {
        numMembers: increment(-1),
      });

      // delete user communitySnippets
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      await batch.commit();
      setCommunityStateValue((state) => ({
        ...state,
        mySnippts: state.mySnippts.filter(
          (snippet) => snippet.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("join community error", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // communityStateValue,
    joinOrLeaveCommunity,
    isJoinedCommunity,
    isLoading,
    error,
  };
}
