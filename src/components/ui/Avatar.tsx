import { Icon, Box, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";

type AvatarProps = {
  source?: string;
  alt: string;
  size?: number;
  fallbackColor?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  source,
  alt,
  size,
  fallbackColor = "blue.500",
}) => {
  const [error, setError] = useState(false);
  return (
    <Box
      w={size || "full"}
      h={size || "full"}
      bg="gray.100"
      borderRadius="full"
      overflow="hidden"
    >
      {source && !error ? (
        <Image src={source} alt={alt} onError={() => setError(true)} />
      ) : (
        <Icon as={FaReddit} w="full" h="full" color={fallbackColor} />
      )}
    </Box>
  );
};
export default Avatar;
