import { storage } from "@/firebase/client";
import { useMutation } from "@tanstack/react-query";
import { User, updateProfile as updateProfileData } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

type Vars = {
  image: string;
  user: User;
};

const updateProfile = async ({ image, user }: Vars) => {
  const newProfileImgRef = await uploadString(
    ref(storage, `/users/${user?.displayName}`),
    image,
    "data_url"
  );
  const newProfileImg = await getDownloadURL(newProfileImgRef.ref);

  console.log(newProfileImg);
  await updateProfileData(user, {
    photoURL: newProfileImg || undefined,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};
