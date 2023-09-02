import ProfileLayout from "@/components/Layout/ProfileLayout";
import UpdateProfile from "@/components/Profile/update-profile";
import { NextPageWithLayout } from "@/pages/_app";

const UpdateProfilePage: NextPageWithLayout = () => {

  return <UpdateProfile />;
};

UpdateProfilePage.getLayout = (page) => {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export default UpdateProfilePage;
