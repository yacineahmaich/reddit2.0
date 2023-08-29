import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { ImFeed } from "react-icons/im";
import { CgCommunity } from "react-icons/cg";
import { IoBookmarkOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import Link from "next/link";

const profileNavigation = [
  {
    label: "Personal Feed",
    href: "/u/profile",
    icon: <ImFeed />,
  },
  {
    label: "My Communities",
    href: "/u/my-communities",
    icon: <CgCommunity />,
  },
  {
    label: "My Saved",
    href: "/u/saved",
    icon: <IoBookmarkOutline />,
  },
  {
    label: "Edit Profile",
    href: "/u/edit-profile",
    icon: <LiaUserEditSolid />,
  },
];

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <Flex bg="white" p={1} borderRadius={4} justify="space-between">
      {profileNavigation.map(({ href, icon, label }) => (
        <Button
          as={Link}
          href={href}
          leftIcon={icon}
          variant="ghost"
          borderRadius={4}
          fontSize="9pt"
        >
          {label}
        </Button>
      ))}
    </Flex>
  );
};
export default Navigation;
