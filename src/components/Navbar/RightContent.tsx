import { Flex } from "@chakra-ui/react";
import AuthModal from "../Auth/AuthModal";
import AuthButtons from "./RightContent/AuthButtons";
import UserDropdown from "./RightContent/UserDropdown";
import UserNav from "./RightContent/UserNav";
import { User } from "firebase/auth";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <UserNav /> : <AuthButtons />}
        <UserDropdown user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
