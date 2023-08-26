import { authModalAtom } from "@/atoms/authModalAtom";
import { useSignin } from "@/features/auth/useSignup";
import { getFirebaseError } from "@/firebase/errors";
import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { signupSchema } from "./schemas";

type SignupValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);

  const { mutate: signup, isLoading, isError, error } = useSignin();
  const signupError = error as AuthError;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  function onSubmit({ email, password }: SignupValues) {
    signup({ email, password });
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
            <Text>{getFirebaseError(signupError.message)}</Text>
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

        <FormControl isInvalid={!!errors.confirmPassword?.message}>
          <Input
            type="password"
            {...register("confirmPassword")}
            placeholder="confirm password"
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
            {errors.confirmPassword?.message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit" height="36px" isLoading={isLoading}>
          Sign Up
        </Button>
        <Flex fontSize="10pt" justify="center">
          <Text>Already a redditor?</Text>
          <Text
            ml={1}
            color="blue.500"
            fontWeight={700}
            cursor="pointer"
            onClick={() =>
              setAuthModalState((state) => ({ ...state, view: "login" }))
            }
          >
            LOG IN
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};
export default Signup;
