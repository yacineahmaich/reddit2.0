import { usePost } from "@/features/posts/usePost";
import useQueryParam from "@/hooks/useQueryParam";
import {
  Flex,
  Spinner,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import React, { useState } from "react";
import PostForm from "./PostForm";
import PostFormHeader from "./PostFormHeader";
import UploadImage from "./UploadImage";

const CreateEditPost: React.FC = () => {
  const postId = useQueryParam("post")
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
              <TabPanel key="post-tab">
                <PostForm post={post} image={image} />
              </TabPanel>,
              <TabPanel key="upload-tab">
                <UploadImage
                  post={post}
                  selectedImage={image}
                  onSelectImage={setImage}
                />
              </TabPanel>,
              <TabPanel key="link-tab">
                <p>Link</p>
              </TabPanel>,
              <TabPanel key="poll-tab">
                <p>Poll</p>
              </TabPanel>,
              <TabPanel key="talk-tab">
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
