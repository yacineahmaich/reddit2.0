import { createPostState } from "@/atoms/createPostAtom";
import { useSelectFile } from "@/hooks/useSelectFile";
import { Button, Flex, HStack, Image } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";

const UploadImage: React.FC = () => {
  const [{ image }, setCreatePostState] = useRecoilState(createPostState);

  const { handleSelectFile } = useSelectFile((image) =>
    setCreatePostState((state) => ({
      ...state,
      image,
    }))
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

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
            onChange={handleSelectFile}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default UploadImage;
