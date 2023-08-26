import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
  return (
    <Flex align="center" shrink={0} as={Link} href="/">
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
