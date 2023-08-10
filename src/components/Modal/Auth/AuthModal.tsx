import React from "react";
import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  Flex,
  Text,
  Divider,
  Box,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import AuthForms from "./AuthForms";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  function handleClose() {
    setModalState((state) => ({ ...state, open: false }));
  }

  return (
    <Modal isOpen={modalState.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          {modalState.view === "login" && "Login"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "resetPassword" && "Reset Password"}
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
            <OAuthButtons />
            <AuthForms />
            {/* <ResetPassword /> */}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
