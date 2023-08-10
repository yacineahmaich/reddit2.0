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
import { authModalState } from "@/atoms/authModalAtom";
import AuthForms from "./AuthForms";
import OAuthButtons from "./OAuthButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";
import ResetPassword from "./ResetPassword";

const AuthModal: React.FC = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalState);

  // close Auth Modal whe user authenticate
  useAuthState(auth, {
    onUserChanged: async (user) => {
      if (user) handleClose();
    },
  });

  function handleClose() {
    setAuthModal((state) => ({ ...state, open: false }));
  }

  return (
    <Modal isOpen={authModal.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          {authModal.view === "login" && "Login"}
          {authModal.view === "signup" && "Sign Up"}
          {authModal.view === "resetPassword" && "Reset Password"}
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
            {authModal.view !== "resetPassword" ? (
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
