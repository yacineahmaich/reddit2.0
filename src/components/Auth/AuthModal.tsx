import React from "react";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalAtom } from "@/atoms/authModalAtom";
import AuthForms from "./AuthForms";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);

  // close Auth Modal whe user authenticate
  useAuthState(auth, {
    onUserChanged: async (user) => {
      if (user) handleClose();
    },
  });

  function handleClose() {
    setAuthModalState((state) => ({ ...state, open: false }));
  }

  return (
    <Modal isOpen={authModalState.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          {authModalState.view === "login" && "Login"}
          {authModalState.view === "signup" && "Sign Up"}
          {authModalState.view === "resetPassword" && "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          paddingBottom={6}
        >
          <Flex direction="column" align="center" justify="center" width="70%">
            {authModalState.view !== "resetPassword" ? (
              <>
                <OAuthButtons />
                <AuthForms />
              </>
            ) : (
              <ResetPassword />
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
