import { firestore, storage } from "@/firebase/client";
import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";

type Vars = {
  id: string;
  image: string;
};

async function updateProfile({ id, image }: Vars) {
  const communityDocRef = doc(firestore, "communities", id);

  const imageRef = ref(storage, `/communities/${communityDocRef.id}/image`);

  await uploadString(imageRef, image, "data_url");

  const imageDownloadURL = await getDownloadURL(imageRef);

  await updateDoc(communityDocRef, {
    imageURL: imageDownloadURL,
  });
}

export function useUpdateCommunityImage() {
  const router = useRouter();

  const {
    mutate: updateCommunityProfile,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      router.reload();
    },
  });

  return {
    updateCommunityProfile,
    isLoading,
    isError,
  };
}
