import { getUserDirectory } from "@/features/user/useDirectory";
import { getUserVotes } from "@/features/user/useUserVotes";
import { auth } from "@/firebase/client";
import { Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const queryClient = useQueryClient();

  const [_, isLoading, error] = useAuthState(auth, {
    onUserChanged: async (user) => {
      if (user) {
        queryClient.prefetchQuery({
          queryKey: ["user", "votes"],
          queryFn: () => getUserVotes(user.uid),
        });
        queryClient.prefetchQuery({
          queryKey: ["user", "directory"],
          queryFn: () => getUserDirectory(user),
        });
      }
    },
  });

  if (isLoading) {
    return (
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
    );
  }

  if (error) {
    return (
      <Flex align="center" direction="column" gap={3} mt={10}>
        <Text fontWeight={700} fontSize="14pt">
          Something went wrong, Please try again
        </Text>
        <Button>Refresh</Button>
      </Flex>
    );
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
