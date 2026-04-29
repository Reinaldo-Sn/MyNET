import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/axios';

interface User {
  id: number;
  username: string;
  display_name: string;
  email: string;
  bio: string;
  avatar: string | null;
  banner: string | null;
  followers_count: number;
  following_count: number;
  pinned_post_id: number | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setPinnedPost: (postId: number | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      api.get('/auth/profile/')
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const res = await api.post('/auth/login/', { username, password });
    localStorage.setItem('access', res.data.access);
    localStorage.setItem('refresh', res.data.refresh);
    const profile = await api.get('/auth/profile/');
    setUser(profile.data);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  const setPinnedPost = (postId: number | null) => {
    setUser((prev) => prev ? { ...prev, pinned_post_id: postId } : prev);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setPinnedPost }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
