import { Community } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/client";
import { usePosts } from "@/hooks/usePosts";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import { useEffect, useState } from "react";
import { Post } from "@/atoms/postsAtom";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { Stack } from "@chakra-ui/react";
import PostSkeleton from "./PostSkeleton";

type PostsFeedProps = {
  community: Community;
};

const PostsFeed: React.FC<PostsFeedProps> = ({ community }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const { postState, setPostState, onDeletePost, onSelectPost, onVotePost } =
    usePosts();

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", community.id),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postsQuery);

      const posts = postDocs.docs.map((doc) => doc.data() as Post);

      setPostState((state) => ({
        ...state,
        allPosts: posts,
      }));

      try {
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [community.id, setPostState]);

  return (
    <>
      {isLoading ? (
        <PostSkeleton />
      ) : (
        <Stack>
          {postState.allPosts.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onVotePost={onVotePost}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={1}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default PostsFeed;
