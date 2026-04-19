import { ReactNode } from "react";
import Navbar from "./Navbar/main";
import CreatePostModal from "./CreatePostModal/main";
import { usePostContext } from "../contexts/PostContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { modalOpen, closeModal, setLatestPost } = usePostContext();

  return (
    <>
      <Navbar />
      {modalOpen && (
        <CreatePostModal
          onClose={closeModal}
          onCreated={(post) => { setLatestPost(post); closeModal(); }}
        />
      )}
      {children}
    </>
  );
};

export default Layout;
