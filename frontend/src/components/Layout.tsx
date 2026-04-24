import { ReactNode } from "react";
import styled from "styled-components";
import { Plus, Sun, Moon } from "lucide-react";
import Navbar from "./Navbar/main";
import CreatePostModal from "./CreatePostModal/main";
import DMButton from "./DMButton/main";
import PokeButton from "./PokeButton/main";
import WhatsNewBanner from "./WhatsNewBanner/main";
import { usePostContext } from "../contexts/PostContext";
import { useThemeToggle } from "../contexts/ThemeContext";

const FloatBtn = styled.button`
  position: fixed;
  right: 28px;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.border};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  z-index: 297;
  transition: transform 0.15s, opacity 0.15s;
  &:hover { transform: scale(1.07); opacity: 0.9; }
`;

const Layout = ({ children }: { children: ReactNode }) => {
  const { modalOpen, closeModal, setLatestPost, openModal } = usePostContext();
  const { isDark, toggleTheme } = useThemeToggle();

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
      <FloatBtn style={{ bottom: "220px" }} onClick={openModal} title="Novo post">
        <Plus size={22} />
      </FloatBtn>
      <FloatBtn style={{ bottom: "156px" }} onClick={toggleTheme} title="Alternar tema">
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </FloatBtn>
      <PokeButton />
      <DMButton />
    </>
  );
};

export default Layout;
