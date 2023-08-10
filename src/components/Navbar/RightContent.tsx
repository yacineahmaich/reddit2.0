import { auth } from "@/firebase/client";
import { Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthModal from "../Modal/Auth/AuthModal";
import AuthButtons from "./RightContent/AuthButtons";
import UserDropdown from "./RightContent/UserDropdown";
import UserNav from "./RightContent/UserNav";

const RightContent: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <UserNav /> : <AuthButtons />}
        <UserDropdown />
      </Flex>
    </>
  );
};
export default RightContent;
