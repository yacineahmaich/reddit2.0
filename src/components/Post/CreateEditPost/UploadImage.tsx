import { createPostAtom } from "@/atoms/createPostAtom";
import { useSelectFile } from "@/hooks/useSelectFile";
import { Post } from "@/types/global";
import { Flex, Button, HStack, Image } from "@chakra-ui/react";
import React, { useRef } from "react";

type UploadImageProps = {
  post?: Post;
  onSelectImage: (image?: string) => void;
  selectedImage?: string;
};

const UploadImage: React.FC<UploadImageProps> = ({
  post,
  onSelectImage,
  selectedImage,
}) => {
  const { handleSelectFile } = useSelectFile(onSelectImage);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleRemove() {
    onSelectImage(undefined);
  }

  const postImage = post?.imageURL;

  return (
    <Flex width="100%" justify="center" align="center" direction="column">
      {(selectedImage || postImage) && (
        <>
          <Image
            src={selectedImage || postImage}
            alt="image"
            maxHeight={postImage ? "100px" : "400px"}
            maxWidth="100%"
            my={postImage ? "20px" : 0}
          />
        </>
      )}
      {!selectedImage && (
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
      {selectedImage && (
        <HStack mt={4}>
          {/* <Button size="sm" px="30px" onClick={handleGoBackToPost}>
            Back to Post
          </Button> */}
          <Button size="sm" px="30px" variant="outline" onClick={handleRemove}>
            Remove
          </Button>
        </HStack>
      )}
    </Flex>
  );
};
export default UploadImage;
