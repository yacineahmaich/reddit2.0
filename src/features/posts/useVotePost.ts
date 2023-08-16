import { doc, increment, runTransaction } from "firebase/firestore";
import { firestore } from "@/firebase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "./types";

type Vars = {
  post: Post;
  userId: string;
  vote: number;
};

const voteOnPost = async ({ post, userId, vote }: Vars) => {
  try {
    await runTransaction(firestore, async (transaction) => {
      const voteDocRef = doc(firestore, `/users/${userId}/votes`, post.id!);

      const postDocRef = doc(firestore, "posts", post.id!);
      const currentVoteDoc = await transaction.get(voteDocRef);

      // User already voted this post
      if (currentVoteDoc.exists()) {
        const { vote: currentVote } = currentVoteDoc.data();

        // Cancel Vote
        if (currentVote === vote) {
          transaction.delete(voteDocRef);

          transaction.update(postDocRef, {
            numOfVotes: increment(-currentVote),
          });
        } else {
          // Toggle Vote
          transaction.update(voteDocRef, {
            vote,
          });
          // inc/dec post numOfVotes
          transaction.update(postDocRef, {
            numOfVotes: increment(vote * 2),
          });
        }
      } else {
        // First time user vote on this post
        transaction.set(voteDocRef, {
          postId: post.id!,
          vote,
        });
        // decrement post numOfVotes
        transaction.update(postDocRef, {
          numOfVotes: increment(vote),
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const useVotePost = () => {
  const queryClient = useQueryClient();

  const { mutate: votePost, isLoading } = useMutation({
    mutationFn: voteOnPost,
    onSuccess: async (_, { post }) => {
      await queryClient.invalidateQueries([
        "community",
        post.communityId,
        "posts",
      ]);
      await queryClient.invalidateQueries(["user", "votes"]);
    },
  });

  return {
    votePost,
    isLoading,
  };
};
