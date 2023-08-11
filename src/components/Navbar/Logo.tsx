import { Flex, Image } from "@chakra-ui/react";
import React from "react";

const Logo: React.FC = () => {
  return (
    <Flex alignItems="center">
      <Image src="/images/redditFace.svg" alt="reddit logo" height="30px" />
      <Image
        src="/images/redditText.svg"
        alt="reddit logo"
        height="46px"
        display={{ base: "none", md: "block" }}
      />
    </Flex>
  );
};
export default Logo;
