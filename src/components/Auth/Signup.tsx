import { authModalAtom } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/client";
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
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { signupSchema } from "./schemas";
import { doc, setDoc } from "firebase/firestore";
import { transformUser } from "@/firebase/helpers";

type SignupValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);

  const [signup, user, loading, signupError] =
    useCreateUserWithEmailAndPassword(auth);

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

  async function onSubmit({ email, password }: SignupValues) {
    const data = await signup(email, password);
    if (!data) return;

    // safe created user in firestore collection
    const user = transformUser(data.user);
    const userDocRef = doc(firestore, "users", user.uid);

    await setDoc(userDocRef, user);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Flex direction="column" gap={2}>
        {signupError && (
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

        <Button type="submit" height="36px" isLoading={loading}>
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
