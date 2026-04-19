import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import perfilPadrao from "../../assets/perfil_padrao.png";
import {
  Overlay, Modal, Header, Title, CloseButton,
  AvatarWrapper, AvatarImg, CameraOverlay, HiddenInput,
  BioTextarea, Footer, SaveButton, CancelButton,
} from "./style";

interface Props {
  currentAvatar: string | null;
  currentBio: string;
  onClose: () => void;
  onSave: (bio: string, avatarFile: File | null) => Promise<void>;
  onSelectImage: (src: string) => void;
}

const EditProfileModal = ({ currentAvatar, currentBio, onClose, onSave, onSelectImage }: Props) => {
  const [bio, setBio] = useState(currentBio);
  const [preview, setPreview] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const src = URL.createObjectURL(file);
    setPendingFile(file);
    setPreview(src);
    onSelectImage(src);
    e.target.value = "";
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(bio, pendingFile);
    setSaving(false);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Editar perfil</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <AvatarWrapper onClick={() => fileRef.current?.click()}>
          <AvatarImg src={preview || currentAvatar || perfilPadrao} alt="avatar" />
          <CameraOverlay>
            <Camera size={22} color="#fff" />
          </CameraOverlay>
          <HiddenInput ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} />
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
