import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { usePostContext } from "../../contexts/PostContext";
import api from "../../api/axios";
import PostCard, { Post } from "../../components/PostCard/main";
import { Container, Empty, QuickPost, QuickTextarea, QuickFooter, CharCount, QuickButton } from "./style";

const FeedPage = () => {
  const { user } = useAuth();
  const { latestPost, setLatestPost } = usePostContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [quickContent, setQuickContent] = useState("");
  const [quickLoading, setQuickLoading] = useState(false);

  useEffect(() => {
    api.get("/posts/feed/").then((res) => setPosts(res.data));
  }, []);

  useEffect(() => {
    if (!latestPost) return;
    setPosts((prev) => [latestPost, ...prev]);
    setLatestPost(null);
  }, [latestPost]);

  const handleQuickPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!quickContent.trim()) return;
    setQuickLoading(true);
    try {
      const res = await api.post("/posts/", { content: quickContent });
      setPosts((prev) => [res.data, ...prev]);
      setQuickContent("");
    } finally {
      setQuickLoading(false);
    }
  };

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
      <QuickPost onSubmit={handleQuickPost}>
        <QuickTextarea
          placeholder="O que você está pensando?"
          value={quickContent}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuickContent(e.target.value)}
          maxLength={180}
          rows={3}
        />
        <QuickFooter>
          <CharCount $over={quickContent.length > 180}>{quickContent.length}/180</CharCount>
          <QuickButton type="submit" disabled={quickLoading || !quickContent.trim() || quickContent.length > 180}>
            {quickLoading ? "Postando..." : "Postar"}
          </QuickButton>
        </QuickFooter>
      </QuickPost>

      {posts.length === 0 && <Empty>Nenhum post ainda. Siga alguém!</Empty>}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={user!.id}
          onLike={handleLike}
          onDelete={handleDelete}
          onEdit={handleEdit}
          commentLimit={4}
        />
      ))}
    </Container>
  );
};

export default FeedPage;
