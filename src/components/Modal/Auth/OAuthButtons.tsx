import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";

const OAuthButtons: React.FC = () => {
  return (
    <>
      <Flex direction="column" gap={2} mb={4}>
        <Button variant="oauth">
          <Image
            src="/images/googlelogo.png"
            alt="Google"
            width="20px"
            height="20px"
            mr={4}
          />
          <Text>Continue with Google</Text>
        </Button>
        <Button variant="oauth">Continue with Other provider</Button>
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
