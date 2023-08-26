import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { authModalAtom } from "@/atoms/authModalAtom";
import { useLogin } from "@/features/auth/useLogin";
import { getFirebaseError } from "@/firebase/errors";
import { WarningIcon } from "@chakra-ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { loginSchema } from "./schemas";

type LoginValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);

  const { mutate: login, isLoading, isError, error } = useLogin();
  const loginError = error as AuthError;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  function onSubmit({ email, password }: LoginValues) {
    login({ email, password });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Flex direction="column" gap={2}>
        {isError && (
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
            <Text>{getFirebaseError(loginError?.message)}</Text>
          </Box>
        )}

        <FormControl isInvalid={!!errors.email?.message}>
          <Input
            type="email"
            {...register("email")}
            placeholder="email"
            fontSize="10pt"
            _placeholder={{ color: "gray.500" }}
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            bg="gray.50"
          />
          <FormErrorMessage fontSize="10pt" color="red.400" fontWeight={700}>
            <WarningIcon mr={2} fontSize="11pt" />
            {errors.email?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password?.message}>
          <Input
            type="password"
            {...register("password")}
            placeholder="password"
            fontSize="10pt"
            _placeholder={{ color: "gray.500" }}
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            bg="gray.50"
          />
          <FormErrorMessage fontSize="10pt" color="red.400" fontWeight={700}>
            <WarningIcon mr={2} fontSize="11pt" />
            {errors.password?.message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit" height="36px" isLoading={isLoading}>
          Log In
        </Button>
        <Flex fontSize="9pt" justify="center">
          <Text>Forgot your password?</Text>
          <Text
            ml={1}
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
            onClick={() =>
              setAuthModalState((state) => ({
                ...state,
                view: "resetPassword",
              }))
            }
          >
            Reset
          </Text>
        </Flex>
        <Flex fontSize="9pt" justify="center">
          <Text>New here?</Text>
          <Text
            ml={1}
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
            onClick={() =>
              setAuthModalState((state) => ({ ...state, view: "signup" }))
            }
          >
            SIGN UP
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};
export default Login;
