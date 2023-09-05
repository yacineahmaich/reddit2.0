import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
const Menu = dynamic(
  import("@chakra-ui/react").then((mod) => mod.Menu),
  { ssr: false }
);

import { authModalAtom } from "@/atoms/authModalAtom";
import { useLogout } from "@/features/auth/useLogout";
import { getUserNameFromUserObj } from "@/firebase/helpers";
import { User } from "firebase/auth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BsPerson } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { useSetRecoilState } from "recoil";
import Avatar from "@/components/ui/Avatar";

type UserDropdownProps = {
  user?: User | null;
};

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalAtom);

  const { mutate: logout } = useLogout();

  return (
    <Menu>
      <MenuButton
        id="UserDropdown"
        p="0 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center">
          <Flex align="center" shrink={0}>
            {user ? (
              <>
                <Avatar
                  source={user.photoURL || ""}
                  alt={user.displayName!}
                  size={6}
                />
                <Flex
                  direction="column"
                  align="flex-start"
                  display={{ base: "none", md: "flex" }}
                  fontSize="8pt"
                  shrink={0}
                  ml={2}
                >
                  <Text fontWeight={700}>{getUserNameFromUserObj(user)}</Text>
                  <Flex gap={1}>
                    <Icon as={IoSparkles} color="brand.100" />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <>
                <Icon color="gray.300" as={BsPerson} fontSize={24} />
              </>
            )}

            <Icon color="gray.300" as={ChevronDownIcon} fontSize={24} />
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              color="gray.400"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              as={Link}
              href={`/u/${user?.displayName}`}
            >
              <Flex align="center" gap={3}>
                <Icon as={CgProfile} fontSize={20} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              color="gray.400"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => logout()}
            >
              <Flex align="center" gap={3}>
                <Icon as={MdOutlineLogout} fontSize={20} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              color="gray.400"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
              <Flex align="center" gap={3}>
                <Icon as={MdOutlineLogout} fontSize={20} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserDropdown;
