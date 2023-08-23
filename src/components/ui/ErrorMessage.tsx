import { WarningIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import React from "react";

type ErrorMessageProps = {
  error?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error = "something went wrong! Please try again",
}) => {
  return (
    <Box
      fontSize="10pt"
      display="flex"
      alignItems="center"
      gap={3}
      color="red.400"
      fontWeight={700}
      mb={3}
    >
      <WarningIcon fontSize="11pt" />
      <Text>{error}</Text>
    </Box>
  );
};
export default ErrorMessage;
