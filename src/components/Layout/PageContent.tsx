import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log(children);

  return (
    <Flex justify="center" p="16px 0">
      <Flex width="95%" maxW="860px">
        {/* LEFT CONTENT */}
        <Flex direction="column" width={{ base: "100%", md: "65%" }}>
          {children?.[0 as keyof typeof children]}
        </Flex>

        {/* RIGHT CONTENT */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          grow={1}
        >
          {children?.[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
