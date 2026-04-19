import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { Container, Title, Form, Textarea, FileInput, Button, ErrorMsg } from "./style";

const CreatePostPage = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);
      await api.post("/posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/feed");
    } catch {
      setError("Erro ao criar post.");
    }
  };

  return (
    <Container>
      <Title>Novo post</Title>
      <Form onSubmit={handleSubmit}>
        <Textarea
          placeholder="O que você está pensando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
        <FileInput
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] ?? null)}
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Button type="submit">Publicar</Button>
      </Form>
    </Container>
  );
}

export default CreatePostPage
