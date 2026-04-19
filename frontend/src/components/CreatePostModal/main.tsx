import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import api from "../../api/axios";
import { Post } from "../PostCard/main";
import {
  Overlay, Modal, Header, Title, CloseButton,
  Textarea, HiddenInput, ImagePreview, PreviewImg, RemoveImage,
  Footer, FooterLeft, CharCount, CameraButton, ErrorMsg, SubmitButton,
} from "./style";

const MAX = 180;

interface Props {
  onClose: () => void;
  onCreated: (post: Post) => void;
}

const CreatePostModal = ({ onClose, onCreated }: Props) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    e.target.value = "";
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!content.trim() || content.length > MAX) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);
      const res = await api.post("/posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCreated(res.data);
      onClose();
    } catch {
      setError("Erro ao criar post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Novo post</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
          <Textarea
            placeholder="O que você está pensando?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            autoFocus
          />

          {imagePreview && (
            <ImagePreview>
              <PreviewImg src={imagePreview} alt="preview" />
              <RemoveImage type="button" onClick={removeImage}><X size={12} /></RemoveImage>
            </ImagePreview>
          )}

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <Footer>
            <FooterLeft>
              <CameraButton type="button" onClick={() => fileRef.current?.click()}>
                <Camera size={18} />
              </CameraButton>
              <CharCount $over={content.length > MAX}>{content.length}/{MAX}</CharCount>
            </FooterLeft>
            <SubmitButton type="submit" disabled={loading || !content.trim() || content.length > MAX}>
              {loading ? "Publicando..." : "Publicar"}
            </SubmitButton>
          </Footer>

          <HiddenInput ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} />
        </form>
      </Modal>
    </Overlay>
  );
};

export default CreatePostModal;
