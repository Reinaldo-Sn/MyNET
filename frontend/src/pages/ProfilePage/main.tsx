import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../api/axios";
import perfilPadrao from "../../assets/perfil_padrao.png";
import PostCard, { Post } from "../../components/PostCard/main";
import FollowModal from "../../components/FollowModal/main";
import {
  Container, ProfileHeader, Avatar, Username, Bio, Stats, StatButton,
  SectionTitle, Empty, EditButton, EditForm, EditInput,
  EditTextarea, EditActions, SaveButton, CancelButton,
} from "./style";

type ModalType = "followers" | "following" | null;

const ProfilePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalType>(null);

  useEffect(() => {
    if (!user) return;
    setBio(user.bio || "");
    api.get("/posts/").then((res) => {
      const myPosts = res.data.filter((p: Post) => p.author === user.id);
      setPosts(myPosts);
    });
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setAvatarFile(file);
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    if (avatarFile) formData.append("avatar", avatarFile);
    await api.patch("/auth/profile/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
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
      <ProfileHeader>
        <Avatar src={avatarPreview || user?.avatar || perfilPadrao} alt="avatar" />
        {!editing ? (
          <>
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
            <EditButton onClick={() => setEditing(true)}>Editar perfil</EditButton>
          </>
        ) : (
          <EditForm onSubmit={handleSave}>
            <EditTextarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Sua bio..."
              rows={3}
            />
            <EditInput type="file" accept="image/*" onChange={handleAvatarChange} />
            <EditActions>
              <SaveButton type="submit">Salvar</SaveButton>
              <CancelButton type="button" onClick={() => setEditing(false)}>Cancelar</CancelButton>
            </EditActions>
          </EditForm>
        )}
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
