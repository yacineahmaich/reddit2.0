import { CommunityPrivacyType } from "@/features/communities/types";
import { useCreateCommunity } from "@/features/communities/useCreateCommunity";
import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { createCommunitySchema } from "./schema";

type CreateCommunityModalProps = {
  open: boolean;
  onClose: () => void;
};

type CreateCommunityValues = {
  name: string;
};
const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  onClose,
}) => {
  const { createCommunity, isLoading: isCreating } = useCreateCommunity();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createCommunitySchema),
  });
  const [selectedType, setSelectedType] = useState(CommunityPrivacyType.PUBLIC);

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value as CommunityPrivacyType;

    setSelectedType(value);
  }

  function onSubmit({ name }: CreateCommunityValues) {
    createCommunity(
      {
        name,
        type: selectedType,
      },
      {
        onSuccess: onClose,
      }
    );
  }

  const remainingChars = 21 - Number(watch("name").length);

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

        <form onSubmit={handleSubmit(onSubmit)}>
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
                <FormControl isInvalid={!!errors.name?.message}>
                  <Input {...register("name")} maxLength={21} pl={8} />
                  <FormErrorMessage
                    fontSize="10pt"
                    color="red.400"
                    fontWeight={700}
                  >
                    <WarningIcon mr={2} fontSize="11pt" />
                    {errors.name?.message}
                  </FormErrorMessage>
                </FormControl>
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
                    value={CommunityPrivacyType.PUBLIC}
                    isChecked={selectedType === CommunityPrivacyType.PUBLIC}
                    onChange={handleTypeChange}
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
                    value={CommunityPrivacyType.RESTRICTED}
                    isChecked={selectedType === CommunityPrivacyType.RESTRICTED}
                    onChange={handleTypeChange}
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
                    value={CommunityPrivacyType.PRIVATE}
                    isChecked={selectedType === CommunityPrivacyType.PRIVATE}
                    onChange={handleTypeChange}
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
            <Button type="submit" height="30px" isLoading={isCreating}>
              Create Community
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default CreateCommunityModal;
