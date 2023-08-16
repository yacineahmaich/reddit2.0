import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  MenuButton,
  Flex,
  Icon,
  Text,
  Box,
  Image,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import { TiHome } from "react-icons/ti";
import { useCommunity } from "@/features/communities/useCommunity";
import { FaReddit } from "react-icons/fa";

const DropdownButton: React.FC = () => {
  const { community, isLoading } = useCommunity();

  return (
    <MenuButton
      p="0 6px"
      mx={{ base: 1, md: 3 }}
      minW="100px"
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
          {community || isLoading ? (
            <SkeletonCircle
              w={7}
              h={7}
              isLoaded={!isLoading}
              mr={{ base: 1, md: 2 }}
            >
              <Box w={7} h={7}>
                {community?.imageURL ? (
                  <Image
                    src={community?.imageURL}
                    borderRadius="full"
                    w="full"
                    h="full"
                    objectFit="cover"
                    alt={community?.id}
                  />
                ) : (
                  <Icon
                    as={FaReddit}
                    w="full"
                    h="full"
                    borderRadius="full"
                    color="blue.500"
                  />
                )}
              </Box>
            </SkeletonCircle>
          ) : (
            <Icon as={TiHome} mr={{ base: 1, md: 2 }} h={7} w={7} />
          )}
          <Skeleton isLoaded={!isLoading}>
            <Text
              display={{ base: "none", md: "block" }}
              fontWeight={600}
              fontSize="10pt"
            >
              {community?.id || "Home"}
            </Text>
          </Skeleton>
        </Flex>

        <Icon as={ChevronDownIcon} fontSize={24} />
      </Flex>
    </MenuButton>
  );
};
export default DropdownButton;
