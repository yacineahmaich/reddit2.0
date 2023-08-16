import { useCommunity } from "@/features/communities/useCommunity";
import { useUpdateCommunityImage } from "@/features/communities/useUpdateCommunityImage";
import { auth } from "@/firebase/client";
import { useSelectFile } from "@/hooks/useSelectFile";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import CommunityProfile from "../shared/CommunityProfile";

const AboutCommunity: React.FC = () => {
  const [user] = useAuthState(auth);

  const { community, isLoading: isCommunityLoading } = useCommunity();
  const { updateCommunityProfile, isLoading } = useUpdateCommunityImage();

  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>();
  const { handleSelectFile } = useSelectFile(setSelectedImage);

  function handleUpdateCommunityProfile() {
    if (!selectedImage) return;

    updateCommunityProfile({
      id: community.id,
      image: selectedImage,
      userId: user?.uid!,
    });
  }

  return (
    <Box pt={4} position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        p={3}
        color="white"
        bg="blue.400"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
      </Flex>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minHeight="200px"
        p={3}
        bg="white"
        borderRadius="0px 0px 4px 4px"
      >
        {isCommunityLoading ? (
          <Spinner color="gray.300" />
        ) : (
          <Box w="full">
            {user?.uid === community?.creatorId && (
              <Box
                bg="gray.100"
                width="100%"
                p={2}
                borderRadius={4}
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
              >
                <Text fontSize="9pt" fontWeight={700} color="blue.500">
                  Add description
                </Text>
              </Box>
            )}
            <Stack spacing={2}>
              <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
                <Flex direction="column" flexGrow={1}>
                  <Text>{community?.numMembers?.toLocaleString()}</Text>
                  <Text>Members</Text>
                </Flex>
                <Flex direction="column" flexGrow={1}>
                  <Text>1</Text>
                  <Text>Online</Text>
                </Flex>
              </Flex>
              <Divider />
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                {community?.createdAt && (
                  <Text>
                    Created{" "}
                    {moment(
                      new Date(community.createdAt!.seconds * 1000)
                    ).format("MMM DD, YYYY")}
                  </Text>
                )}
              </Flex>
              <Link href={`/r/${community?.id}/submit`}>
                <Button mt={3} height="30px" w="full">
                  Create Post
                </Button>
              </Link>
              {user?.uid === community?.creatorId && (
                <>
                  <Divider />
                  <Stack spacing={1} fontSize="11pt">
                    <Text fontWeight={600}>Admin</Text>
                    <Flex align="center" justify="space-between">
                      <Text
                        color="blue.500"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => imageRef?.current?.click()}
                        fontSize="10pt"
                      >
                        Change Image
                      </Text>
                      <input
                        type="file"
                        ref={imageRef}
                        onChange={handleSelectFile}
                        hidden
                      />
                      <CommunityProfile
                        source={selectedImage || community?.imageURL || ""}
                        size={10}
                        fallbackColor="brand.100"
                        alt={community.id}
                      />
                    </Flex>
                    {selectedImage && (
                      <Button
                        variant="ghost"
                        color="brand.100"
                        size="sm"
                        mt={2}
                        isLoading={isLoading}
                        onClick={handleUpdateCommunityProfile}
                      >
                        Save Changes
                      </Button>
                    )}
                  </Stack>
                </>
              )}
            </Stack>
          </Box>
        )}
      </Flex>
    </Box>
  );
};
export default AboutCommunity;
