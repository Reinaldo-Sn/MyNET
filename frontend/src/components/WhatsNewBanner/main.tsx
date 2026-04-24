import { useState } from "react";
import { Modal, TitleRow, BannerTitle, Version, List, Item, CloseBtn } from "./style";

const BANNER_VERSION = "v1";
const STORAGE_KEY = "whats_new_seen";

const ITEMS = [
  "Curtir comentários e respostas",
  "Mensagens diretas entre usuários",
  "Vídeos do YouTube incorporados e Gifs",
  "Imagens da área de transferência",
  "Gifs de preferência Giphy e Tenor",
  "Exclusão de conta pro Micael"
];

const WhatsNewBanner = () => {
  const [visible, setVisible] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) !== BANNER_VERSION;
  });

  if (!visible) return null;

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, BANNER_VERSION);
    setVisible(false);
  };

  return (
    <Modal>
      <TitleRow>
        <BannerTitle>Novidades</BannerTitle>
        <Version>{BANNER_VERSION}</Version>
      </TitleRow>
      <List>
        {ITEMS.map((item) => (
          <Item key={item}>{item}</Item>
        ))}
      </List>
      <CloseBtn onClick={handleClose}>Não exibir novamente</CloseBtn>
    </Modal>
  );
};

export default WhatsNewBanner;
