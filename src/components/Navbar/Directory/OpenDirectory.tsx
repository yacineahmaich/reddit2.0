import Avatar from "@/components/ui/Avatar";
import { useCommunity } from "@/features/communities/useCommunity";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  MenuButton,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { TiHome } from "react-icons/ti";

const OpenDirectory: React.FC = () => {
  const router = useRouter();
  const communityId = router.query.communityId;

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
          {community || communityId ? (
            <SkeletonCircle
              w={7}
              h={7}
              isLoaded={!isLoading}
              mr={{ base: 1, md: 2 }}
            >
              <Avatar
                source={community?.imageURL}
                size={7}
                alt={community?.id}
              />
            </SkeletonCircle>
          ) : (
            <Icon as={TiHome} mr={{ base: 1, md: 2 }} h={7} w={7} />
          )}
          <Skeleton isLoaded={!isLoading || !communityId}>
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
export default OpenDirectory;
