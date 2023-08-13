import { createPostState } from "@/atoms/createPostAtom";
import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";

const UploadImage: React.FC = () => {
  const [{ image }, setCreatePostState] = useRecoilState(createPostState);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSelectImage(e: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    const selectedImage = e.target.files?.[0];

    if (!selectedImage) return;

    reader.readAsDataURL(selectedImage);
    reader.onload = (e) => {
      if (!e.target?.result) return;

      setCreatePostState((state) => ({
        ...state,
        image: e.target?.result as string,
      }));
    };
  }

  function handleGoBackToPost() {
    setCreatePostState((state) => ({
      ...state,
      activeTab: "post",
    }));
  }

  function handleRemove() {
    setCreatePostState((state) => ({
      ...state,
      image: undefined,
    }));
  }

  return (
    <Flex width="100%" justify="center" align="center" direction="column">
      {image ? (
        <>
          <Image src={image} alt="image" maxHeight="400px" maxWidth="100%" />
          <HStack mt={4}>
            <Button size="sm" px="30px" onClick={handleGoBackToPost}>
              Back to Post
            </Button>
            <Button
              size="sm"
              px="30px"
              variant="outline"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </HStack>
        </>
      ) : (
        <Flex
          border="1px dashed"
          borderColor="gray.200"
          padding={20}
          align="center"
          justify="center"
          borderRadius={4}
          width="100%"
        >
          <Button
            variant="outline"
            height="28px"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            id="image"
            onChange={handleSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default UploadImage;
