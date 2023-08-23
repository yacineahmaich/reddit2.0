import React from "react";
import { TabList, Tab, Flex, Icon, Text } from "@chakra-ui/react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";

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

type PostFormHeaderProps = {
  isLoading: boolean;
};

const PostFormHeader: React.FC<PostFormHeaderProps> = ({ isLoading }) => {
  return (
    <TabList>
      {TAB_ITEMS.map((item) => (
        <Tab
          key={item.key}
          flexGrow={1}
          p="14px 0"
          cursor="pointer"
          fontWeight={700}
          gap={1}
          _hover={{
            bg: "gray.50",
          }}
          color={false ? "blue.500" : "gray.500"}
          borderBottomColor="gray.200"
          isDisabled={isLoading}
        >
          <Flex align="center" height="20px">
            <Icon as={item.icon} />
          </Flex>
          <Text fontSize="10pt">{item.title}</Text>
        </Tab>
      ))}
    </TabList>
  );
};
export default PostFormHeader;
