import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import perfilPadrao from "../../assets/perfil_padrao.png";
import fundoPadrao from "../../assets/fundo_padrao.webp";
import PostCard, { Post } from "../../components/PostCard/main";
import FollowModal from "../../components/FollowModal/main";
import EditProfileModal from "../../components/EditProfileModal/main";
import AvatarCropModal from "../../components/AvatarCropModal/main";
import {
  Container, ProfileHeader, BannerSection, Banner, Avatar, ProfileInfo,
  Username, Bio, Stats, StatButton,
  SectionTitle, Empty, ProfileActions, EditButton, LogoutButton,
} from "./style";

type ModalType = "followers" | "following" | null;

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [croppedFile, setCroppedFile] = useState<File | null>(null);
  const [croppedPreview, setCroppedPreview] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalType>(null);

  useEffect(() => {
    if (!user) return;
    api.get("/posts/").then((res) => {
      setPosts(res.data.filter((p: Post) => p.author === user.id));
    });
  }, [user]);

  const handleSelectImage = (src: string) => {
    setCropSrc(src);
    setEditing(false);
  };

  const handleCropSave = (file: File) => {
    setCroppedFile(file);
    setCroppedPreview(URL.createObjectURL(file));
    setCropSrc(null);
    setEditing(true);
  };

  const handleSave = async (bio: string, avatarFile: File | null, bannerFile: File | null) => {
    const formData = new FormData();
    formData.append("bio", bio);
    const fileToUpload = avatarFile || croppedFile;
    if (fileToUpload) formData.append("avatar", fileToUpload);
    if (bannerFile) formData.append("banner", bannerFile);
    await api.patch("/auth/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setEditing(false);
    setCroppedFile(null);
    setCroppedPreview(null);
    window.location.reload();
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
      {cropSrc && (
        <AvatarCropModal
          imageSrc={cropSrc}
          onCancel={() => { setCropSrc(null); setEditing(true); }}
          onSave={handleCropSave}
        />
      )}

      {editing && (
        <EditProfileModal
          currentAvatar={croppedPreview || user?.avatar || null}
          currentBanner={user?.banner || null}
          currentBio={user?.bio || ""}
          onClose={() => { setEditing(false); setCroppedFile(null); setCroppedPreview(null); }}
          onSave={handleSave}
          onSelectImage={handleSelectImage}
        />
      )}

      <ProfileHeader>
        <BannerSection>
          <Banner $src={user?.banner || fundoPadrao} />
          <Avatar src={croppedPreview || user?.avatar || perfilPadrao} alt="avatar" />
        </BannerSection>
        <ProfileInfo>
          <Username>{user?.username}</Username>
          <Bio>{user?.bio || "Sem bio."}</Bio>
          <Stats>
            <StatButton onClick={() => setModal("followers")}>
              Seguidores: {user?.followers_count}
            </StatButton>
            <StatButton onClick={() => setModal("following")}>
              Seguindo: {user?.following_count}
            </StatButton>
          </Stats>
          <ProfileActions>
            <EditButton onClick={() => setEditing(true)}>Editar perfil</EditButton>
            <LogoutButton onClick={() => { logout(); navigate("/login"); }}>Sair</LogoutButton>
          </ProfileActions>
        </ProfileInfo>
      </ProfileHeader>

      <SectionTitle>Meus posts</SectionTitle>
      {posts.length === 0 && <Empty>Nenhum post ainda.</Empty>}
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

      {modal && user && (
        <FollowModal
          userId={user.id}
          type={modal}
          onClose={() => setModal(null)}
        />
      )}
    </Container>
  );
};

export default ProfilePage;
