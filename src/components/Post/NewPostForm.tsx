import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import TextInputs from "./Forms/TextInputs";
import UploadImage from "./Forms/UploadImage";
import { useRecoilState } from "recoil";
import { createPostState } from "@/atoms/createPostAtom";

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

const NewPostForm: React.FC = () => {
  const [{ activeTab }] = useRecoilState(createPostState);

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex>
        {TAB_ITEMS.map((item) => (
          <TabItem key={item.key} item={item} />
        ))}
      </Flex>
      <Flex bg="white" p={4}>
        {activeTab === "post" && <TextInputs />}
        {activeTab === "upload" && <UploadImage />}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
