import { communityState } from "@/atoms/communitiesAtom";
import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";

type SubmitPostPageProps = {};

const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
  const communityStateValue = useRecoilValue(communityState);
  console.log(communityStateValue);
  return (
    <PageContent>
      <>
        <Box p="14px 0" borderBottom="1px solid" borderColor="white">
          <Text>Create Post</Text>
        </Box>
        <NewPostForm />
      </>
      <>{/* <AboutCommunity /> */}</>
    </PageContent>
  );
};

export default SubmitPostPage;
