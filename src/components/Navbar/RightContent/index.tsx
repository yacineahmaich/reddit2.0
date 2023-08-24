import AuthModal from "@/components/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import AuthButtons from "./AuthButtons";
import UserDropdown from "./UserDropdown";
import UserNav from "./UserNav";

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
