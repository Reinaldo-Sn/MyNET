import { createContext, useContext, useState, ReactNode } from "react";
import { Post } from "../components/PostCard/main";

interface PostContextType {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  latestPost: Post | null;
  setLatestPost: (post: Post | null) => void;
}

const PostContext = createContext<PostContextType>({
  modalOpen: false,
  openModal: () => {},
  closeModal: () => {},
  latestPost: null,
  setLatestPost: () => {},
});

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [latestPost, setLatestPost] = useState<Post | null>(null);

  return (
    <PostContext.Provider value={{
      modalOpen,
      openModal: () => setModalOpen(true),
      closeModal: () => setModalOpen(false),
      latestPost,
      setLatestPost,
    }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
