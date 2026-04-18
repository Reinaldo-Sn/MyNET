import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await api.get(`/auth/users/?search=${query}`);
    setResults(res.data);
  };

  return (
    <div>
      <h1>Buscar usuários</h1>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Digite um username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {results.map((u) => (
        <div
          key={u.id}
          onClick={() => navigate(`/users/${u.id}`)}
          style={{ cursor: "pointer" }}
        >
          <strong>{u.username}</strong>
          <p>Seguidores: {u.followers_count}</p>
        </div>
      ))}
    </div>
  );
}
