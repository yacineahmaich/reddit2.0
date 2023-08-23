import { usePost } from "@/features/posts/usePost";
import {
  Flex,
  Spinner,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import PostForm from "./PostForm";
import PostFormHeader from "./PostFormHeader";
import UploadImage from "./UploadImage";

const CreateEditPost: React.FC = () => {
  const router = useRouter();
  const postId = router.query.post as string;
  const { data: post, isLoading } = usePost(postId);

  const [image, setImage] = useState<string>();

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      mt={2}
      position="relative"
    >
      <Tabs>
        <PostFormHeader isLoading={isLoading && !!postId} />
        <TabPanels>
          {isLoading && postId ? (
            <TabPanel
              minH="200px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner color="gray.400" />
            </TabPanel>
          ) : (
            [
              <TabPanel>
                <PostForm post={post} image={image} />
              </TabPanel>,
              <TabPanel>
                <UploadImage
                  post={post}
                  selectedImage={image}
                  onSelectImage={setImage}
                />
              </TabPanel>,
              <TabPanel>
                <p>Link</p>
              </TabPanel>,
              <TabPanel>
                <p>Poll</p>
              </TabPanel>,
              <TabPanel>
                <p>Talk</p>
              </TabPanel>,
            ]
          )}
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
export default CreateEditPost;
