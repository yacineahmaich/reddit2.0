import { authModalAtom } from "@/atoms/authModalAtom";
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
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaEdit } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useSetRecoilState } from "recoil";
import Avatar from "../ui/Avatar";

const AboutCommunity: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalAtom);

  const { community, isLoading: isCommunityLoading } = useCommunity();
  const { mutate: updateCommunityProfile, isLoading } =
    useUpdateCommunityImage();

  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string>();
  const { handleSelectFile } = useSelectFile(setSelectedImage);

  function handleUpdateCommunityProfile() {
    updateCommunityProfile({
      id: community.id,
      image: selectedImage!,
      userId: user?.uid!,
    });
  }

  function handleCreatePostClick() {
    if (!user) return setAuthModalState({ open: true, view: "login" });

    router.push(`/r/${community?.id}/submit`);
  }

  const isModerator = user?.uid === community?.creatorId;

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
        {isCommunityLoading || !community ? (
          <Spinner color="blue.400" />
        ) : (
          <Box w="full">
            <Stack spacing={2}>
              <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
                <Flex direction="column" flexGrow={1}>
                  <Text>{community?.numOfMembers?.toString()}</Text>
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
              <Button
                role="link"
                mt={3}
                height="30px"
                w="full"
                onClick={handleCreatePostClick}
              >
                Create Post
              </Button>
              {isModerator && (
                <>
                  <Divider />
                  <Stack spacing={1} fontSize="11pt">
                    <Text fontWeight={600}>Creator</Text>
                    <Flex align="center" justify="space-between">
                      <Button
                        leftIcon={<FaEdit />}
                        size="xs"
                        variant="link"
                        onClick={() => imageRef?.current?.click()}
                      >
                        Edit Profile
                      </Button>
                      <input
                        type="file"
                        ref={imageRef}
                        onChange={handleSelectFile}
                        hidden
                      />
                      <Avatar
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
