import { auth, firestore } from "@/firebase/client";
import { transformUser } from "@/firebase/helpers";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { CustomParameters, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

type SignInWithProviderFunc = (
  scopes?: string[] | undefined,
  customOAuthParameters?: CustomParameters | undefined
) => Promise<UserCredential | undefined>;

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithGithub] = useSignInWithGithub(auth);

  async function handleSignInWithProvider(
    signInWithOauthProvider: SignInWithProviderFunc
  ) {
    // add new users to firestore users collection
    const data = await signInWithOauthProvider();
    if (!data) return;

    const user = transformUser(data.user);
    const userDocRef = doc(firestore, "users", user.uid);

    // create user document if not exists
    await setDoc(userDocRef, user);
  }

  return (
    <>
      <Flex direction="column" gap={2} mb={4}>
        <Button
          variant="oauth"
          onClick={() => handleSignInWithProvider(signInWithGoogle)}
        >
          <Image
            src="/images/googlelogo.png"
            alt="Google"
            width="20px"
            height="20px"
            mr={4}
          />
          <Text>Continue with Google</Text>
        </Button>
        <Button
          variant="oauth"
          onClick={() => handleSignInWithProvider(signInWithGithub)}
        >
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
