import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import perfilPadrao from "../../assets/perfil_padrao.png";
import {
  Overlay, Modal, Header, Title, CloseButton,
  BannerWrapper, BannerArea, BannerOverlay,
  AvatarWrapper, AvatarImg, CameraOverlay, HiddenInput,
  BioTextarea, Footer, SaveButton, CancelButton,
} from "./style";

interface Props {
  currentAvatar: string | null;
  currentBanner: string | null;
  currentBio: string;
  onClose: () => void;
  onSave: (bio: string, avatarFile: File | null, bannerFile: File | null) => Promise<void>;
  onSelectImage: (src: string) => void;
}

const EditProfileModal = ({ currentAvatar, currentBanner, currentBio, onClose, onSave, onSelectImage }: Props) => {
  const [bio, setBio] = useState(currentBio);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [pendingAvatar, setPendingAvatar] = useState<File | null>(null);
  const [pendingBanner, setPendingBanner] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const src = URL.createObjectURL(file);
    setPendingAvatar(file);
    setAvatarPreview(src);
    onSelectImage(src);
    e.target.value = "";
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setPendingBanner(file);
    setBannerPreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(bio, pendingAvatar, pendingBanner);
    setSaving(false);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Editar perfil</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <BannerWrapper onClick={() => bannerRef.current?.click()}>
          <BannerArea $src={bannerPreview || currentBanner} />
          <BannerOverlay>
            <Camera size={22} color="#fff" />
          </BannerOverlay>
          <HiddenInput ref={bannerRef} type="file" accept="image/*" onChange={handleBannerChange} />
        </BannerWrapper>

        <AvatarWrapper onClick={() => avatarRef.current?.click()}>
          <AvatarImg src={avatarPreview || currentAvatar || perfilPadrao} alt="avatar" />
          <CameraOverlay>
            <Camera size={22} color="#fff" />
          </CameraOverlay>
          <HiddenInput ref={avatarRef} type="file" accept="image/*" onChange={handleAvatarChange} />
        </AvatarWrapper>

        <BioTextarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Sua bio..."
          rows={4}
        />

        <Footer>
          <CancelButton onClick={onClose}>Cancelar</CancelButton>
          <SaveButton onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </SaveButton>
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default EditProfileModal;
