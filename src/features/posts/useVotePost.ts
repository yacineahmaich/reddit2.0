import { firestore } from "@/firebase/client";
import { Post } from "@/types/database";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, increment, runTransaction } from "firebase/firestore";
import { useRouter } from "next/router";

type Vars = {
  post: Post;
  userId: string;
  vote: number;
};

type Vote = {
  postId: string;
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
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voteOnPost,
    onMutate({ post, vote }) {
      // 1) Cancel active queries
      queryClient.cancelQueries(["user", "votes"]);
      queryClient.cancelQueries(["posts", post.id]);
      queryClient.cancelQueries(["community", post.communityId, "posts"]);

      // 2) Previous user votes snapshot
      const previousUserVotes =
        queryClient.getQueryData<Vote[]>(["user", "votes"]) ?? [];

      const previousPost = queryClient.getQueryData<Post>(["posts", post.id]);

      const previousPosts = queryClient.getQueryData<Post[]>([
        "community",
        post.communityId,
        "posts",
      ]);

      const alreadyVoted = previousUserVotes.find(
        (vote) => vote.postId === post.id
      );

      if (alreadyVoted) {
        // cancel vote
        if (alreadyVoted.vote === vote) {
          queryClient.setQueryData(
            ["user", "votes"],
            previousUserVotes.filter((v) => v.postId !== post.id)
          );
          // optimisticaly update post numOfvotes
          queryClient.setQueryData(["posts", post.id], {
            ...post,
            numOfVotes: post.numOfVotes - alreadyVoted.vote,
          });
          // optimisticaly update post numOfVotes in posts query
          queryClient.setQueryData(
            ["community", post.communityId, "posts"],
            (posts?: Post[]) => {
              if (posts && posts.length > 0) {
                return posts.map((p) =>
                  p.id === post.id
                    ? { ...p, numOfVotes: p.numOfVotes - alreadyVoted.vote }
                    : p
                );
              } else {
                return posts;
              }
            }
          );
        } else {
          // toggle vote
          queryClient.setQueryData(
            ["user", "votes"],
            previousUserVotes.map((v) =>
              v.postId === post.id
                ? {
                    ...v,
                    vote,
                  }
                : v
            )
          );
          // optimisticaly update post numOfvotes
          queryClient.setQueryData(["posts", post.id], {
            ...post,
            numOfVotes: post.numOfVotes - alreadyVoted.vote * 2,
          });
          queryClient.setQueryData(
            ["community", post.communityId, "posts"],
            (posts?: Post[]) => {
              if (posts && posts.length > 0) {
                return posts.map((p) =>
                  p.id === post.id
                    ? { ...p, numOfVotes: p.numOfVotes - alreadyVoted.vote * 2 }
                    : p
                );
              } else {
                return posts;
              }
            }
          );
        }
      } else {
        // Opmtimistoc Vote
        const optimisticVote: Vote = {
          postId: post?.id!,
          vote,
        };
        // optimisticaly update user votes
        queryClient.setQueryData(
          ["user", "votes"],
          [optimisticVote, ...previousUserVotes]
        );
        // optimisticaly update post numOfvotes
        queryClient.setQueryData(["posts", post.id], {
          ...post,
          numOfVotes: post.numOfVotes + vote,
        });
        // optimisticaly update post numOfVotes in posts query
        queryClient.setQueryData(
          ["community", post.communityId, "posts"],
          (posts?: Post[]) => {
            if (posts && posts.length > 0) {
              return posts.map((p) =>
                p.id === post.id ? { ...p, numOfVotes: p.numOfVotes + vote } : p
              );
            } else {
              return posts;
            }
          }
        );
      }

      return {
        previousUserVotes,
        previousPost,
        previousPosts,
      };
    },
    onError(_err, { post }, ctx) {
      queryClient.setQueryData(["user", "votes"], ctx?.previousUserVotes);

      queryClient.setQueryData(["posts", post.id], ctx?.previousPost);

      queryClient.setQueryData(
        ["community", post.communityId, "posts"],
        ctx?.previousPosts
      );
    },
    onSuccess: (_data, { post }) => {
      queryClient.invalidateQueries(["user", "votes"]);
      queryClient.invalidateQueries(["posts", post.id]);
      queryClient.invalidateQueries(["community", post.communityId, "posts"]);
    },
  });
};
