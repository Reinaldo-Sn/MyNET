import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function UserProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    api.get(`/auth/users/${id}/`).then((res) => setProfile(res.data));
    api.get("/posts/").then((res) => {
      const userPosts = res.data.filter((p) => p.author === parseInt(id));
      setPosts(userPosts);
    });
  }, [id]);

    const handleFollow = async () => {
        await api.post(`/follows/${id}/follow/`);
        const res = await api.get(`/auth/users/${id}/`);
        setProfile(res.data);
        setFollowing(!following);
    };

  if (!profile) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{profile.username}</h1>
      <p>{profile.bio || "Sem bio."}</p>
      <p>
        Seguidores: {profile.followers_count} | Seguindo:{" "}
        {profile.following_count}
      </p>
      <button onClick={handleFollow}>
        {following ? "Deixar de seguir" : "Seguir"}
      </button>

      <h2>Posts</h2>
      {posts.length === 0 && <p>Nenhum post ainda.</p>}
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.content}</p>
          <small>{new Date(post.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}
