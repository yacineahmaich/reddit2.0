import { auth } from "@/firebase/client";
import { Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import CommunitiesDropdown from "./CommunitiesDropdown";
import Logo from "./Logo";
import RightContent from "./RightContent";
import Search from "./Search";

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <Flex bg="white" height="44px" padding="6px 12px" justify="space-between">
      <Logo />
      {user && <CommunitiesDropdown />}
      <Search user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
