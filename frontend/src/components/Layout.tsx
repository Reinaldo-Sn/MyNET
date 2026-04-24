import { ReactNode } from "react";
import Navbar from "./Navbar/main";
import CreatePostModal from "./CreatePostModal/main";
import DMButton from "./DMButton/main";
import WhatsNewBanner from "./WhatsNewBanner/main";
import { usePostContext } from "../contexts/PostContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { modalOpen, closeModal, setLatestPost } = usePostContext();

  return (
    <>
      <Navbar />
      <WhatsNewBanner />
      {modalOpen && (
        <CreatePostModal
          onClose={closeModal}
          onCreated={(post) => { setLatestPost(post); closeModal(); }}
        />
      )}
      {children}
      <DMButton />
    </>
  );
};

export default Layout;
