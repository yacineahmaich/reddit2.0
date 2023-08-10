import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  function handleClose() {
    setModalState((state) => ({ ...state, open: false }));
  }

  return (
    <Modal isOpen={modalState.open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalState.view === "login" && "Login"}
          {modalState.view === "signup" && "Sign Up"}
          {modalState.view === "resetPassword" && "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, optio?
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AuthModal;
