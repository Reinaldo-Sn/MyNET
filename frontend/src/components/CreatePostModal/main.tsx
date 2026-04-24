import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import api from "../../api/axios";
import { Post } from "../PostCard/main";
import { isGifUrl } from "../../utils/gif";
import {
  Overlay, Modal, Header, Title, CloseButton,
  Textarea, HiddenInput, ImagePreview, PreviewImg, RemoveImage,
  Footer, FooterLeft, CharCount, CameraButton, GifButton, GifInputRow, GifInput,
  ErrorMsg, SubmitButton,
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
  const [gifUrl, setGifUrl] = useState("");
  const [showGifInput, setShowGifInput] = useState(false);
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
    setGifUrl("");
    setShowGifInput(false);
    setError("");
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    for (const item of Array.from(e.clipboardData.items)) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (!file) continue;
        if (file.size > MAX_FILE_MB * 1024 * 1024) {
          setError(`Imagem muito grande. Máximo ${MAX_FILE_MB}MB.`);
          return;
        }
        const compressed = await compressImage(file);
        setImage(compressed);
        setImagePreview(URL.createObjectURL(compressed));
        setGifUrl("");
        setShowGifInput(false);
        setError("");
        return;
      }
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const removeGif = () => {
    setGifUrl("");
    setShowGifInput(false);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!content.trim() || content.length > MAX) return;
    if (gifUrl && !isGifUrl(gifUrl)) {
      setError("URL de GIF inválida.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);
      if (gifUrl) formData.append("gif_url", gifUrl);
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

  const gifPreviewValid = gifUrl && isGifUrl(gifUrl);

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()} onPaste={handlePaste}>
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

          {showGifInput && (
            <GifInputRow>
              <GifInput
                placeholder="Cole o link do GIF (Giphy, Tenor...)"
                value={gifUrl}
                onChange={(e) => setGifUrl(e.target.value)}
                autoFocus
              />
              <RemoveImage type="button" onClick={removeGif} style={{ position: "static", background: "transparent", color: "inherit", width: "auto", height: "auto", borderRadius: 4 }}>
                <X size={14} />
              </RemoveImage>
            </GifInputRow>
          )}

          {gifPreviewValid && (
            <ImagePreview>
              <img src={gifUrl} alt="gif preview" style={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 8 }} onError={(e) => e.currentTarget.style.display = "none"} />
            </ImagePreview>
          )}

          {imagePreview && (
            <ImagePreview>
              <PreviewImg src={imagePreview} alt="preview" />
              <RemoveImage type="button" onClick={removeImage}><X size={12} /></RemoveImage>
            </ImagePreview>
          )}

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <Footer>
            <FooterLeft>
              <CameraButton type="button" onClick={() => { fileRef.current?.click(); }} title="Adicionar imagem">
                <Camera size={18} />
              </CameraButton>
              <GifButton
                type="button"
                onClick={() => { setShowGifInput((v) => !v); setImage(null); setImagePreview(null); }}
                title="Adicionar GIF"
              >
                GIF
              </GifButton>
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
