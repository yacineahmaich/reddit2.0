import React from "react";
import PageContent from "./PageContent";
import Navigation from "../Profile/Navigation";
import { Flex } from "@chakra-ui/react";
import UserCard from "../Profile/ProfileCard";

type ProfileLayoutProps = {
  children: React.ReactNode;
};

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <PageContent>
      <>
        <Navigation />
        {children}
      </>
      <>
        <UserCard />
      </>
    </PageContent>
  );
};
export default ProfileLayout;
