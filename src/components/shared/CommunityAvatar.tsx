import { Icon, Box, Image } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

type CommunityAvatarProps = {
  source?: string;
  alt: string;
  size?: number;
  fallbackColor?: string;
};

const CommunityAvatar: React.FC<CommunityAvatarProps> = ({
  source,
  alt,
  size,
  fallbackColor = "blue.500",
}) => {
  return (
    <Box
      w={size || "full"}
      h={size || "full"}
      bg="gray.100"
      borderRadius="full"
      overflow="hidden"
    >
      {source ? (
        <Image src={source} w="full" h="full" objectFit="cover" alt={alt} />
      ) : (
        <Icon as={FaReddit} w="full" h="full" color={fallbackColor} />
      )}
    </Box>
  );
};
export default CommunityAvatar;
