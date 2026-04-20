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
const MAX_FILE_MB = 5;

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX_DIM = 1280;
      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        if (width > height) { height = Math.round((height * MAX_DIM) / width); width = MAX_DIM; }
        else { width = Math.round((width * MAX_DIM) / height); height = MAX_DIM; }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        resolve(new File([blob!], file.name, { type: "image/jpeg" }));
      }, "image/jpeg", 0.82);
    };
    img.src = url;
  });
}

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    e.target.value = "";
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setError(`Imagem muito grande. Máximo ${MAX_FILE_MB}MB.`);
      return;
    }
    const compressed = await compressImage(file);
    setImage(compressed);
    setImagePreview(URL.createObjectURL(compressed));
    setError("");
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
