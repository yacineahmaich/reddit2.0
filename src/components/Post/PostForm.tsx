import React, { useEffect, useMemo } from "react";
import { Alert, Text, Flex, Icon, Spinner, Button } from "@chakra-ui/react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import TextInputs from "./Forms/TextInputs";
import UploadImage from "./Forms/UploadImage";
import { useRecoilState } from "recoil";
import { createPostState } from "@/atoms/createPostAtom";
import { usePost } from "@/features/posts/usePost";
import { WarningIcon } from "@chakra-ui/icons";
import { useCommunity } from "@/features/communities/useCommunity";
import { Post } from "@/types/global";

export type TabItemType = {
  key: string;
  title: string;
  icon: typeof Icon.arguments;
};

const TAB_ITEMS = [
  {
    key: "post",
    title: "Post",
    icon: IoDocumentText,
  },
  {
    key: "upload",
    title: "Images & video",
    icon: IoImageOutline,
  },
  {
    key: "link",
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    key: "poll",
    title: "Poll",
    icon: BiPoll,
  },
  {
    key: "talk",
    title: "Talk",
    icon: BsMic,
  },
];

type PostFormProps = {
  post: Post | null;
  isEditing: boolean;
};

const PostForm: React.FC<PostFormProps> = ({ isEditing, post }) => {
  const [{ activeTab }, setCreatePostState] = useRecoilState(createPostState);

  const { id, body, title, imageURL } = post ?? {};

  useEffect(() => {
    if (id) return;

    setCreatePostState({
      activeTab: "Post",
      title: title!,
      body: body,
      image: imageURL,
    });
  }, [setCreatePostState, body, title, imageURL, id]);

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      mt={2}
      position="relative"
    >
      <Flex>
        {TAB_ITEMS.map((item) => (
          <TabItem key={item.key} item={item} />
        ))}
      </Flex>
      <Flex bg="white" p={4}>
        {activeTab === "post" && (
          <TextInputs post={post} isEditing={isEditing} />
        )}
        {activeTab === "upload" && <UploadImage />}
      </Flex>
    </Flex>
  );
};
export default PostForm;
