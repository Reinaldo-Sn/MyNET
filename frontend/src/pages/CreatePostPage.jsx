import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
    <div>
      <h1>Novo post</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="O que você está pensando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Publicar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
