import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { ImFeed } from "react-icons/im";
import { CgCommunity } from "react-icons/cg";
import { IoBookmarkOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/client";
import { useRouter } from "next/router";

const profileNavigation = [
  {
    label: "Personal Feed",
    path: "",
    icon: <ImFeed />,
  },
  {
    label: "Communities",
    path: "communities",
    icon: <CgCommunity />,
  },
  {
    label: "My Saved",
    path: "saved",
    icon: <IoBookmarkOutline />,
    authenticated: true,
  },
  {
    label: "Update Profile",
    path: "update-profile",
    icon: <LiaUserEditSolid />,
    authenticated: true,
  },
];

type NavigationProps = {};

const Navigation: React.FC<NavigationProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const displayName = router.query.displayName as string;

  const isCurrentUserPersonalProfile = user?.displayName === displayName;

  return (
    <Flex
      bg="white"
      p={1}
      borderRadius={4}
      justify={isCurrentUserPersonalProfile ? "space-between" : "start"}
      mb={4}
    >
      {profileNavigation.map(({ path, icon, label, authenticated }) => {
        if (authenticated && !isCurrentUserPersonalProfile) return;

        const href = `/u/${displayName}${path ? `/${path}` : ""}`;
        const isActive = href === router.asPath;
        return (
          <Button
            key={label}
            as={Link}
            href={href}
            leftIcon={icon}
            variant="ghost"
            borderRadius={4}
            fontSize="9pt"
            color={isActive ? "brand.100" : ""}
          >
            {label}
          </Button>
        );
      })}
    </Flex>
  );
};
export default Navigation;
