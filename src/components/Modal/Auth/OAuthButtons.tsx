import { auth } from "@/firebase/client";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);

  return (
    <>
      <Flex direction="column" gap={2} mb={4}>
        <Button variant="oauth" onClick={() => signInWithGoogle()}>
          <Image
            src="/images/googlelogo.png"
            alt="Google"
            width="20px"
            height="20px"
            mr={4}
          />
          <Text>Continue with Google</Text>
        </Button>
        <Button variant="oauth" onClick={() => signInWithGithub()}>
          <Image
            src="/images/githublogo.png"
            alt="Google"
            width="20px"
            height="20px"
            mr={4}
          />
          <Text>Continue with Github</Text>
        </Button>
      </Flex>

      <Box position="relative" width="100%" padding="10px 0">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Text fontSize="10pt" fontWeight={400} color="gray.400">
            OR
          </Text>
        </AbsoluteCenter>
      </Box>
    </>
  );
};
export default OAuthButtons;
