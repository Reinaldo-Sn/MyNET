import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import perfilPadrao from "../../assets/perfil_padrao.png";
import {
  Overlay, Modal, Header, Title, CloseButton,
  BannerWrapper, BannerArea, BannerOverlay,
  AvatarWrapper, AvatarImg, CameraOverlay, HiddenInput,
  FieldInput, BioTextarea, ErrorText, PasswordToggle, PasswordSection, Footer, SaveButton, CancelButton,
} from "./style";

interface Props {
  currentAvatar: string | null;
  currentBanner: string | null;
  currentBio: string;
  currentDisplayName: string;
  onClose: () => void;
  onSave: (bio: string, avatarFile: File | null, bannerFile: File | null, displayName: string, currentPassword: string, newPassword: string) => Promise<void>;
  onSelectImage: (src: string) => void;
  onSelectBannerImage: (src: string) => void;
}

const EditProfileModal = ({ currentAvatar, currentBanner, currentBio, currentDisplayName, onClose, onSave, onSelectImage, onSelectBannerImage }: Props) => {
  const [bio, setBio] = useState(currentBio);
  const [displayName, setDisplayName] = useState(currentDisplayName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [saving, setSaving] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    onSelectImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    onSelectBannerImage(URL.createObjectURL(file));
    e.target.value = "";
  };

  const resetPasswordFields = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const handleSave = async () => {
    if (currentPassword && !newPassword) {
      setPasswordError("Preencha a nova senha.");
      return;
    }
    if (currentPassword && !confirmPassword) {
      setPasswordError("Confirme a nova senha.");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem.");
      return;
    }
    setPasswordError("");
    setSaving(true);
    try {
      await onSave(bio, null, null, displayName, currentPassword, newPassword);
    } catch (err: any) {
      const data = err?.response?.data;
      if (data?.current_password) {
        setPasswordError(data.current_password[0] || "Senha atual incorreta.");
      } else if (data?.new_password) {
        setPasswordError(data.new_password[0] || "Senha inválida.");
      } else {
        setPasswordError("Erro ao salvar. Tente novamente.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Editar perfil</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <BannerWrapper onClick={() => bannerRef.current?.click()}>
          <BannerArea $src={currentBanner} />
          <BannerOverlay>
            <Camera size={22} color="#fff" />
          </BannerOverlay>
          <HiddenInput ref={bannerRef} type="file" accept="image/*" onChange={handleBannerChange} />
        </BannerWrapper>

        <AvatarWrapper onClick={() => avatarRef.current?.click()}>
          <AvatarImg src={currentAvatar || perfilPadrao} alt="avatar" />
          <CameraOverlay>
            <Camera size={22} color="#fff" />
          </CameraOverlay>
          <HiddenInput ref={avatarRef} type="file" accept="image/*" onChange={handleAvatarChange} />
        </AvatarWrapper>

        <FieldInput
          placeholder="Nome de exibição"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          autoComplete="off"
        />

        <BioTextarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Sua bio..."
          rows={3}
        />

        <PasswordToggle onClick={() => {
          if (showPasswordFields) resetPasswordFields();
          setShowPasswordFields(!showPasswordFields);
        }}>
          {showPasswordFields ? "▲" : "▼"} Alterar senha
        </PasswordToggle>

        {showPasswordFields && (
          <PasswordSection>
            <FieldInput
              type="password"
              placeholder="Senha atual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FieldInput
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <FieldInput
              type="password"
              placeholder="Confirmar nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            {passwordError && <ErrorText>{passwordError}</ErrorText>}
          </PasswordSection>
        )}

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
