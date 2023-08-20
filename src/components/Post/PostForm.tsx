import { createPostState } from "@/atoms/createPostAtom";
import { Post } from "@/types/global";
import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import TextInputs from "./Forms/TextInputs";
import UploadImage from "./Forms/UploadImage";
import TabItem from "./TabItem";

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
  const [{ activeTab }] = useRecoilState(createPostState);

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
        {activeTab === "upload" && <UploadImage post={post!} />}
      </Flex>
    </Flex>
  );
};
export default PostForm;
