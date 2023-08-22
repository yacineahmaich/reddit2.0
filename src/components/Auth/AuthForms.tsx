import { authModalAtom } from "@/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import Signup from "./Signup";

const AuthForms: React.FC = () => {
  const authModalState = useRecoilValue(authModalAtom);

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {authModalState.view === "login" && <Login />}
      {authModalState.view === "signup" && <Signup />}
    </Flex>
  );
};
export default AuthForms;
