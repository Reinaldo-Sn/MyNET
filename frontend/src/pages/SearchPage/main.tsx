import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import perfilPadrao from "../../assets/perfil_padrao.png";
import { Container, Title, SearchForm, Input, Button, UserCard, UserAvatar, UserInfo, UserName, Followers } from "./style";

interface UserResult {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
  followers_count: number;
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const res = await api.get(`/auth/users/?search=${query}`);
    setResults(res.data);
  };

  return (
    <Container>
      <Title>Buscar usuários</Title>
      <SearchForm onSubmit={handleSearch}>
        <Input
          placeholder="Digite um username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <Button type="submit">Buscar</Button>
      </SearchForm>

      {results.map((u) => (
        <UserCard key={u.id} onClick={() => navigate(`/users/${u.id}`)}>
          <UserAvatar src={u.avatar || perfilPadrao} alt="avatar" />
          <UserInfo>
            <UserName>{u.display_name || u.username}</UserName>
            <Followers>Seguidores: {u.followers_count}</Followers>
          </UserInfo>
        </UserCard>
      ))}
    </Container>
  );
}

export default SearchPage
