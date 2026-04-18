import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axios";

export default function ProfilePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts/").then((res) => {
      const myPosts = res.data.filter((p) => p.author === user.id);
      setPosts(myPosts);
    });
  }, [user]);

  return (
    <div>
      <h1>{user?.username}</h1>
      <p>{user?.bio || "Sem bio."}</p>
      <p>
        Seguidores: {user?.followers_count} | Seguindo: {user?.following_count}
      </p>

      <h2>Meus posts</h2>
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
