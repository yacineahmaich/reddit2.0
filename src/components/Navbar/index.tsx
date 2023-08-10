import { Flex, Image } from "@chakra-ui/react";
import Search from "./Search";
import RightContent from "./RightContent";

const Navbar = () => {
  return (
    <Flex bg="white" height="44px" padding="6px 12px">
      <Flex alignItems="center">
        <Image src="/images/redditFace.svg" alt="reddit logo" height="30px" />
        <Image
          src="/images/redditText.svg"
          alt="reddit logo"
          height="46px"
          display={{ base: "none", md: "block" }}
        />
      </Flex>
      {/* <Directory /> */}
      <Search />
      <RightContent />
    </Flex>
  );
};
export default Navbar;
