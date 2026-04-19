import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import PostCard, { Post } from "../../components/PostCard/main";
import { Container, Empty } from "./style";

const FeedPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get("/posts/feed/").then((res) => setPosts(res.data));
  }, []);

  const handleLike = async (postId: number) => {
    await api.post(`/posts/${postId}/like/`);
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, is_liked: !p.is_liked, likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1 }
          : p
      )
    );
  };

  const handleDelete = (postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleEdit = (postId: number, newContent: string) => {
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, content: newContent } : p));
  };

  return (
    <Container>
      {posts.length === 0 && <Empty>Nenhum post ainda. Siga alguém!</Empty>}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={user!.id}
          onLike={handleLike}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </Container>
  );
};

export default FeedPage;
