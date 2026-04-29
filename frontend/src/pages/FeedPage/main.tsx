import { useEffect, useState, useRef, useCallback } from "react";
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadPage = useCallback(async (pageNum: number) => {
    setLoadingMore(true);
    try {
      const res = await api.get(`/posts/feed/?page=${pageNum}`);
      setPosts((prev) => pageNum === 1 ? res.data.results : [...prev, ...res.data.results]);
      setHasMore(!!res.data.next);
    } finally {
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  useEffect(() => {
    if (!latestPost) return;
    setPosts((prev) => [latestPost, ...prev]);
    setLatestPost(null);
  }, [latestPost]);

  useEffect(() => {
    if (page === 1) return;
    loadPage(page);
  }, [page, loadPage]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

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
    setPosts((prev) => prev.map((p) => {
      if (p.id === postId) return { ...p, is_liked: !p.is_liked, likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1 };
      if (p.repost_of?.id === postId) return { ...p, repost_of: { ...p.repost_of!, is_liked: !p.repost_of!.is_liked, likes_count: p.repost_of!.is_liked ? p.repost_of!.likes_count - 1 : p.repost_of!.likes_count + 1 } };
      return p;
    }));
  };

  const handleRepost = async (postId: number) => {
    await api.post(`/posts/${postId}/repost/`);
    setPosts((prev) => prev.map((p) => {
      if (p.id === postId) return { ...p, is_reposted: !p.is_reposted, reposts_count: p.is_reposted ? p.reposts_count - 1 : p.reposts_count + 1 };
      if (p.repost_of?.id === postId) return { ...p, repost_of: { ...p.repost_of!, is_reposted: !p.repost_of!.is_reposted, reposts_count: p.repost_of!.is_reposted ? p.repost_of!.reposts_count - 1 : p.repost_of!.reposts_count + 1 } };
      return p;
    }));
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

      {posts.length === 0 && !loadingMore && <Empty>Nenhum post ainda. Siga alguém!</Empty>}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={user!.id}
          onLike={handleLike}
          onRepost={handleRepost}
          onDelete={handleDelete}
          onEdit={handleEdit}
          commentLimit={4}
        />
      ))}

      <div ref={sentinelRef} style={{ height: 1 }} />
      {loadingMore && <p style={{ color: "#aaa", textAlign: "center", padding: "1rem 0" }}>Carregando...</p>}
    </Container>
  );
};

export default FeedPage;
