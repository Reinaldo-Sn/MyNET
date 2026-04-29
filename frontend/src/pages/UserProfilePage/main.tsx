import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import perfilPadrao from "../../assets/perfil_padrao.png";
import fundoPadrao from "../../assets/fundo_padrao.webp";
import PostCard, { Post } from "../../components/PostCard/main";
import FollowModal from "../../components/FollowModal/main";
import {
  Container, ProfileHeader, BannerSection, Banner, Avatar, ProfileInfo,
  Username, UserHandle, Bio, Stats, StatButton, FollowButton, SectionTitle, Empty,
} from "./style";

interface Profile {
  id: number;
  username: string;
  display_name: string;
  bio: string;
  avatar: string | null;
  banner: string | null;
  followers_count: number;
  following_count: number;
  is_following: boolean;
}

type ModalType = "followers" | "following" | null;

const UserProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [following, setFollowing] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);

  useEffect(() => {
    api.get(`/auth/users/${id}/`).then((res) => {
      setProfile(res.data);
      setFollowing(res.data.is_following);
    });
    api.get("/posts/").then((res) => {
      const userPosts = res.data.filter((p: Post) => p.author === parseInt(id!));
      setPosts(userPosts);
    });
  }, [id]);

  const handleFollow = async () => {
    await api.post(`/follows/${id}/follow/`);
    const res = await api.get(`/auth/users/${id}/`);
    setProfile(res.data);
    setFollowing(!following);
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

  if (!profile) return <p style={{ color: "#aaa", textAlign: "center", marginTop: "3rem" }}>Carregando...</p>;

  return (
    <Container>
      <ProfileHeader>
        <BannerSection>
          <Banner $src={profile.banner || fundoPadrao} />
          <Avatar src={profile.avatar || perfilPadrao} alt="avatar" />
        </BannerSection>
        <ProfileInfo>
          <Username>{profile.display_name || profile.username}</Username>
          <UserHandle>@{profile.username}</UserHandle>
          <Bio>{profile.bio || "Sem bio."}</Bio>
          <Stats>
            <StatButton onClick={() => setModal("followers")}>
              Seguidores: {profile.followers_count}
            </StatButton>
            <StatButton onClick={() => setModal("following")}>
              Seguindo: {profile.following_count}
            </StatButton>
          </Stats>
          <FollowButton $following={following} onClick={handleFollow}>
            {following ? "Deixar de seguir" : "Seguir"}
          </FollowButton>
        </ProfileInfo>
      </ProfileHeader>

      <SectionTitle>Posts</SectionTitle>
      {posts.length === 0 && <Empty>Nenhum post ainda.</Empty>}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={user!.id}
          onLike={handleLike}
          onRepost={handleRepost}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}

      {modal && (
        <FollowModal
          userId={profile.id}
          type={modal}
          onClose={() => setModal(null)}
        />
      )}
    </Container>
  );
};

export default UserProfilePage;
