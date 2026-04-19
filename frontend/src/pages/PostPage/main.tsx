import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import PostCard, { Post } from "../../components/PostCard/main";
import { Container, BackButton } from "./style";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    api.get(`/posts/${id}/`).then((res) => setPost(res.data));
  }, [id]);

  const handleLike = async (postId: number) => {
    await api.post(`/posts/${postId}/like/`);
    setPost((prev) =>
      prev ? { ...prev, is_liked: !prev.is_liked, likes_count: prev.is_liked ? prev.likes_count - 1 : prev.likes_count + 1 } : prev
    );
  };

  const handleDelete = () => navigate(-1);

  const handleEdit = (_: number, newContent: string) => {
    setPost((prev) => prev ? { ...prev, content: newContent } : prev);
  };

  if (!post) return <p style={{ color: "#aaa", textAlign: "center", marginTop: "3rem" }}>Carregando...</p>;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Voltar</BackButton>
      <PostCard
        post={post}
        currentUserId={user!.id}
        onLike={handleLike}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Container>
  );
};

export default PostPage;
