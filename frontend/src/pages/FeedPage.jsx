import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';

export default function FeedPage() {
    const { user, logout } = useAuth();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get('/posts/feed/').then(res => setPosts(res.data));
    }, []);

    return (
        <div>
            <h1>Feed</h1>
            <p>Olá, {user?.username}</p>
            <button onClick={logout}>Sair</button>

            {posts.length === 0 && <p>Nenhum post ainda. Siga alguém!</p>}

            {posts.map(post => (
                <div key={post.id}>
                    <strong>{post.author_username}</strong>
                    <p>{post.content}</p>
                    <small>{new Date(post.created_at).toLocaleDateString()}</small>
                </div>
            ))}
        </div>
    );
}
