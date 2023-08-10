import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./RightContent/AuthButtons";
import AuthModal from "../Modal/Auth/AuthModal";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";

const RightContent: React.FC = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          <Button onClick={() => signOut()}>Log Out</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};
export default RightContent;
