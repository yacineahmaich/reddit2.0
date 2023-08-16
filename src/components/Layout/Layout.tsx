import { useUserVotes } from "@/features/user/useUserVotes";
import Navbar from "../Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useUserVotes();

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
