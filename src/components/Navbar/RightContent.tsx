import { Flex } from "@chakra-ui/react";
import AuthButtons from "./RightContent/AuthButtons";
import AuthModal from "../modal/auth/AuthModal";

type RightContentProps = {
  // user:
};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
