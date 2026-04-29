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
    setPost((prev) => {
      if (!prev) return prev;
      if (prev.id === postId) return { ...prev, is_liked: !prev.is_liked, likes_count: prev.is_liked ? prev.likes_count - 1 : prev.likes_count + 1 };
      if (prev.repost_of?.id === postId) return { ...prev, repost_of: { ...prev.repost_of!, is_liked: !prev.repost_of!.is_liked, likes_count: prev.repost_of!.is_liked ? prev.repost_of!.likes_count - 1 : prev.repost_of!.likes_count + 1 } };
      return prev;
    });
  };

  const handleRepost = async (postId: number) => {
    await api.post(`/posts/${postId}/repost/`);
    setPost((prev) => {
      if (!prev) return prev;
      if (prev.id === postId) return { ...prev, is_reposted: !prev.is_reposted, reposts_count: prev.is_reposted ? prev.reposts_count - 1 : prev.reposts_count + 1 };
      if (prev.repost_of?.id === postId) return { ...prev, repost_of: { ...prev.repost_of!, is_reposted: !prev.repost_of!.is_reposted, reposts_count: prev.repost_of!.is_reposted ? prev.repost_of!.reposts_count - 1 : prev.repost_of!.reposts_count + 1 } };
      return prev;
    });
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
        onRepost={handleRepost}
        onDelete={handleDelete}
        onEdit={handleEdit}
        autoShowComments
      />
    </Container>
  );
};

export default PostPage;
