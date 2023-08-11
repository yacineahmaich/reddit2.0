import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Flex, Icon, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { TiHome } from "react-icons/ti";
import CommunitiesList from "./CommunitiesList";

const CommunitiesDropdown: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        p="0 6px"
        mx={{ base: 1, md: 3 }}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex
          align="center"
          justify="space-between"
          width={{ base: "auto", lg: "200px" }}
          color="gray.500"
        >
          <Flex align="center">
            <Icon as={TiHome} mr={{ base: 1, md: 2 }} fontSize={20} />
            <Text
              display={{ base: "none", md: "block" }}
              fontWeight={600}
              fontSize="10pt"
            >
              Home
            </Text>
          </Flex>

          <Icon as={ChevronDownIcon} fontSize={24} />
        </Flex>
      </MenuButton>
      <MenuList>
        <CommunitiesList />
      </MenuList>
    </Menu>
  );
};
export default CommunitiesDropdown;
