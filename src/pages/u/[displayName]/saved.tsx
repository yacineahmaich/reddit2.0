import ProfileLayout from "@/components/Layout/ProfileLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React from "react";

const SavedPage: NextPageWithLayout = () => {
  return <div>Have a good coding</div>;
};

SavedPage.getLayout = (page) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};
export default SavedPage;
