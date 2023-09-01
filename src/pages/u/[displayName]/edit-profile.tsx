import ProfileLayout from "@/components/Layout/ProfileLayout";
import Avatar from "@/components/ui/Avatar";
import { auth } from "@/firebase/client";
import { NextPageWithLayout } from "@/pages/_app";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const EditProfilePage: NextPageWithLayout = () => {
  const [user] = useAuthState(auth);

  return (
    <Flex
      bg="white"
      direction="column"
      p={3}
      borderRadius={4}
      overflow="hidden"
    >
      <Box
        bg="gray.50"
        p={4}
        mx={-3}
        mt={-3}
        mb={5}
        border="1px solid"
        borderColor="gray.100"
      >
        <Text fontWeight={600}>Update Profile</Text>
      </Box>

      <Flex direction="column" align="center" gap={3}>
        <Avatar source={user?.photoURL || ""} alt="profile" size={24} />
        <Button
          size="sm"
          variant="ghost"
          borderRadius={4}
          w="fit-content"
          px={30}
        >
          Update profile
        </Button>
      </Flex>

      <form>
        <Stack>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input placeholder="Username" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" />
          </FormControl>
        </Stack>
        <Flex
          justify="end"
          bg="gray.50"
          p={4}
          mx={-3}
          mb={-3}
          mt={5}
          border="1px solid"
          borderColor="gray.100"
        >
          <Button borderRadius={4}>Save changes</Button>
        </Flex>
      </form>
    </Flex>
  );
};

EditProfilePage.getLayout = (page) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default EditProfilePage;
