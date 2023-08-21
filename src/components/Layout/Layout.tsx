import { useUserVotes } from "@/features/user/useUserVotes";
import Navbar from "../Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";
import { Flex, Spinner, Image, Text, Button } from "@chakra-ui/react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoading, error] = useAuthState(auth);
  useUserVotes();

  if (error) {
    return (
      <Flex align="center" direction="column" gap={3} mt={10}>
        <Text fontWeight={700} fontSize="14pt">Something went wrong, Please try again</Text>
        <Button>Refresh</Button>
      </Flex>
    );
  }

  return (
    <>
      {isLoading ? (
        <Flex
          bg="white"
          height="100vh"
          justify="center"
          align="center"
          direction="column"
        >
          <Flex align="center" direction="column" gap={2}>
            <Image src="/images/redditFace.svg" alt="reddit" w={12} h={12} />
            <Spinner w={4} h={4} color="gray.400" />
          </Flex>
        </Flex>
      ) : (
        <>
          <Navbar />
          <main>{children}</main>
        </>
      )}
    </>
  );
};
export default Layout;
