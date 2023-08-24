import { useRouter } from "next/router";

const useQueryParam = (param: string) => {
  const router = useRouter();

  return router.query[param] as string;
};

export default useQueryParam;
