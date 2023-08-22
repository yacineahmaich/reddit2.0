import { authModalAtom } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/client";
import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

const ResetPassword: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await sendPasswordResetEmail(email);
    setSuccess(true);
  }

  return (
    <Flex direction="column" align="center" gap={3}>
      <Image src="/images/redditFace.svg" alt="reddit" height="50px" />

      <Text fontWeight={700} fontSize="11pt">
        Reset Your Password
      </Text>

      {success ? (
        <Text
          fontSize="10pt"
          textAlign="center"
          border="1px solid"
          borderColor="gray.400"
          borderRadius="10px"
          p={2}
        >
          Please check your email for final step
        </Text>
      ) : (
        <>
          <Text fontSize="10pt" textAlign="center">
            Enter the email associated with your account and we&apos;ll send you
            a reset link
          </Text>
          <form onSubmit={handleSubmit}>
            <Input
              name="email"
              required
              type="email"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" width="100%" mt={3} isLoading={sending}>
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex align="center" gap={1}>
        <Text
          fontSize="10pt"
          fontWeight={700}
          color="blue.500"
          cursor="pointer"
          onClick={() => setAuthModalState((state) => ({ ...state, view: "login" }))}
        >
          LOGIN
        </Text>
        <Text transform="translateY(-5px)">.</Text>
        <Text
          fontSize="10pt"
          fontWeight={700}
          color="blue.500"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((state) => ({ ...state, view: "signup" }))
          }
        >
          SIGNUP
        </Text>
      </Flex>
    </Flex>
  );
};
export default ResetPassword;
