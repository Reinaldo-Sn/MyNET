import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api/axios";

interface MentionLinkProps {
  username: string;
}

const MentionLink = ({ username }: MentionLinkProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user?.username?.toLowerCase() === username.toLowerCase()) {
      navigate("/profile");
      return;
    }
    try {
      const res = await api.get(`/auth/users/?search=${username}`);
      const results: any[] = res.data.results ?? res.data;
      const found = results.find((u) => u.username.toLowerCase() === username.toLowerCase());
      if (found) navigate(`/users/${found.id}`);
    } catch {}
  };

  return (
    <span
      onClick={handleClick}
      style={{ color: "#4a9eff", fontWeight: 500, cursor: "pointer" }}
    >
      @{username}
    </span>
  );
};

export function renderWithMentions(text: string): ReactNode[] {
  return text.split(/(@\w+)/g).map((part, i) =>
    /^@\w+$/.test(part)
      ? <MentionLink key={i} username={part.slice(1)} />
      : part
  );
}
