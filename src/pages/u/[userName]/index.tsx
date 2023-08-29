import ProfileLayout from "@/components/Layout/ProfileLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { Text } from "@chakra-ui/react";
import React from "react";

const PersonalFeedPage: NextPageWithLayout = () => {
  return <Text>YEJFER</Text>;
};

PersonalFeedPage.getLayout = (page) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default PersonalFeedPage;
