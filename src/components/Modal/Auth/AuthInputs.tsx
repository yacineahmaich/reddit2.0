import React from "react";
import { authModalState } from "@/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import Signup from "./Signup";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const authModal = useRecoilValue(authModalState);

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {authModal.view === "login" && <Login />}
      {authModal.view === "signup" && <Signup />}
    </Flex>
  );
};
export default AuthInputs;
