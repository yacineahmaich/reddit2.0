import { firestore, storage } from "@/firebase/client";
import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";

type Vars = {
  id: string;
  image: string;
  userId: string;
};

async function updateProfile({ id, image, userId }: Vars) {
  const communityDocRef = doc(firestore, "communities", id);
  const imageRef = ref(storage, `/communities/${communityDocRef.id}/image`);

  await uploadString(imageRef, image, "data_url");

  const imageDownloadURL = await getDownloadURL(imageRef);

  await updateDoc(communityDocRef, {
    imageURL: imageDownloadURL,
  });

  await updateDoc(doc(firestore, `/users/${userId}/communitySnippets`, id), {
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
