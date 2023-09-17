import { firestore, storage } from "@/firebase/client";
import { useMutation } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router";

type Vars = {
  id: string;
  image: string;
  displayName: string;
};

async function updateProfile({ id, image, displayName }: Vars) {
  const communityDocRef = doc(firestore, "communities", id);
  const imageRef = ref(storage, `/communities/${communityDocRef.id}`);

  await uploadString(imageRef, image, "data_url");

  const imageDownloadURL = await getDownloadURL(imageRef);

  await updateDoc(communityDocRef, {
    imageURL: imageDownloadURL,
  });

  await updateDoc(doc(firestore, `/users/${displayName}/communitySnippets`, id), {
    imageURL: imageDownloadURL,
  });
}

export function useUpdateCommunityImage() {
  const router = useRouter();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      console.log("SUCCESS");
      router.reload();
    },
  });
}
