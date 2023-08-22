import React from "react";
import { TabItemType } from "./PostForm";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { createPostAtom } from "@/atoms/createPostAtom";

type TabItemProps = {
  item: TabItemType;
};

const TabItem: React.FC<TabItemProps> = ({ item }) => {
  const [{ activeTab }, setCreatePostState] = useRecoilState(createPostAtom);

  const isActive = activeTab === item.key;

  function handleSelect() {
    setCreatePostState((state) => ({ ...state, activeTab: item.key }));
  }

  return (
    <Flex
      align="center"
      justify="center"
      flexGrow={1}
      p="14px 0"
      cursor="pointer"
      fontWeight={700}
      gap={1}
      _hover={{
        bg: "gray.50",
      }}
      color={isActive ? "blue.500" : "gray.500"}
      borderWidth={isActive ? "0 1px 2px 0" : "0 1px 1px 0"}
      borderBottomColor={isActive ? "blue.200" : "gray.200"}
      borderRightColor={"gray.200"}
      onClick={handleSelect}
    >
      <Flex align="center" height="20px">
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};
export default TabItem;
