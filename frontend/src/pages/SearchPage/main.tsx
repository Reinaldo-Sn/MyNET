import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import perfilPadrao from "../../assets/perfil_padrao.png";
import { Container, Title, SearchForm, Input, Button, UserCard, UserAvatar, UserInfo, UserName, Followers, FollowButton } from "./style";

interface UserResult {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
  followers_count: number;
  is_following: boolean;
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [suggestions, setSuggestions] = useState<UserResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/users/?top=3").then((res) => setSuggestions(res.data));
  }, []);

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await api.get(`/auth/users/?search=${query}`);
    setResults(res.data);
  };

  const handleFollow = async (e: React.MouseEvent, userId: number, inSuggestions: boolean) => {
    e.stopPropagation();
    await api.post(`/follows/${userId}/follow/`);
    const update = (list: UserResult[]) =>
      list.map((u) =>
        u.id === userId
          ? { ...u, is_following: !u.is_following, followers_count: u.followers_count + (u.is_following ? -1 : 1) }
          : u
      );
    if (inSuggestions) setSuggestions(update);
    else setResults(update);
  };

  const renderCard = (u: UserResult, inSuggestions: boolean) => (
    <UserCard key={u.id} onClick={() => navigate(`/users/${u.id}`)}>
      <UserAvatar src={u.avatar || perfilPadrao} alt="avatar" />
      <UserInfo>
        <UserName>{u.display_name || u.username}</UserName>
        <Followers>Seguidores: {u.followers_count}</Followers>
      </UserInfo>
      <FollowButton $following={u.is_following} onClick={(e) => handleFollow(e, u.id, inSuggestions)}>
        {u.is_following ? "Seguindo" : "Seguir"}
      </FollowButton>
    </UserCard>
  );

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

      {results.length === 0 && suggestions.length > 0 && (
        <>
          <Title style={{ fontSize: "0.85rem", color: "inherit" }}>Mais relevantes</Title>
          {suggestions.map((u) => renderCard(u, true))}
        </>
      )}

      {results.map((u) => renderCard(u, false))}
    </Container>
  );
}

export default SearchPage
