import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
  open: boolean;
  onClose: () => void;
};

type CommunityType = "public" | "restricted" | "private";

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  onClose,
}) => {
  const [communityName, setCommunityName] = useState("");
  const [communityType, setCommunityType] = useState<CommunityType>("public");

  const remainingChars = 21 - Number(communityName.length);

  function handleCommunityNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    if (name.length > 21) return;

    setCommunityName(name);
  }

  function handleCommunityTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCommunityType(e.target.name as CommunityType);
  }

  return (
    <Modal isOpen={open} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          flexDirection="column"
          fontSize={15}
          padding={3}
        >
          Create Community
        </ModalHeader>
        <ModalCloseButton />

        <Box p={3}>
          <Divider />
          <ModalBody display="flex" flexDirection="column" padding="10px 0">
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text fontSize={11} color="gray.500">
              Community names including capitalization cannot be changed
            </Text>
            <InputGroup mt={3} mb={1}>
              <InputLeftElement pointerEvents="none" color="gray.400">
                r /
              </InputLeftElement>
              <Input
                value={communityName}
                onChange={handleCommunityNameChange}
              />
            </InputGroup>
            <Text
              pl={2}
              fontSize="9pt"
              color={remainingChars === 0 ? "red" : "gray.500"}
            >
              {remainingChars} Characters remaining
            </Text>
            <Box my={4}>
              <Text fontWeight={600} fontSize={15} mb={2}>
                Community Type
              </Text>

              <Stack spacing={4}>
                <Checkbox
                  name="public"
                  isChecked={communityType === "public"}
                  onChange={handleCommunityTypeChange}
                >
                  <Flex align="center" gap={1}>
                    <Icon as={BsFillPersonFill} color="gray.500" />
                    <Text fontSize="10pt">Public</Text>
                    <Text fontSize="8pt" color="gray.500">
                      Any one can view, post, and comment to this community.
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  name="restricted"
                  isChecked={communityType === "restricted"}
                  onChange={handleCommunityTypeChange}
                >
                  <Flex align="center" gap={1}>
                    <Icon as={BsFillEyeFill} color="gray.500" />

                    <Text fontSize="10pt">Restricted</Text>
                    <Text fontSize="8pt" color="gray.500">
                      Any one can view, but only approved users can post.
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  name="private"
                  isChecked={communityType === "private"}
                  onChange={handleCommunityTypeChange}
                >
                  <Flex align="center" gap={1}>
                    <Icon as={HiLockClosed} color="gray.500" />

                    <Text fontSize="10pt">Private</Text>
                    <Text fontSize="8pt" color="gray.500">
                      Only approved users can view and submit to this.
                    </Text>
                  </Flex>
                </Checkbox>
              </Stack>
            </Box>
          </ModalBody>
        </Box>

        <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px">
          <Button variant="outline" height="30px" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button height="30px" onClick={() => null}>
            Secondary Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateCommunityModal;
