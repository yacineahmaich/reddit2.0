import Avatar from "@/components/ui/Avatar";
import { useUpdateProfile } from "@/features/profile/useUpdateProfile";
import { auth } from "@/firebase/client";
import { useSelectFile } from "@/hooks/useSelectFile";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const UpdateProfile: React.FC = () => {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState<string>();

  const { mutate: updateProfile } = useUpdateProfile();

  const inputRef = useRef<HTMLInputElement>(null);

  const { handleSelectFile } = useSelectFile(handleUploadProfile);

  function handleUploadProfile(image: string) {
    setProfile(image);
    updateProfile({
      user: user!,
      image,
    });
  }

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
        <Avatar
          source={profile || user?.photoURL || ""}
          alt="profile"
          size={24}
        />
        <Button
          size="sm"
          variant="ghost"
          borderRadius={4}
          w="fit-content"
          px={30}
          onClick={() => inputRef.current?.click()}
        >
          Update profile
        </Button>
        <input
          ref={inputRef}
          type="file"
          id="profile-image"
          onChange={handleSelectFile}
          hidden
        />
      </Flex>
    </Flex>
  );
};
export default UpdateProfile;
