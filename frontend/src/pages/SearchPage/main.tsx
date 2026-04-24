import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import perfilPadrao from "../../assets/perfil_padrao.png";
import {
  Container, Title, SearchForm, Input, Button, UserCard, UserAvatar,
  UserInfo, UserName, Followers, FollowButton, Pagination, PageBtn, PageInfo,
} from "./style";

interface UserResult {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
  followers_count: number;
  is_following: boolean;
}

const PAGE_SIZE = 8;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [suggestions, setSuggestions] = useState<UserResult[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  useEffect(() => {
    api.get("/auth/users/?top=3").then((res) => setSuggestions(res.data));
  }, []);

  const fetchPage = async (p: number) => {
    const res = await api.get(`/auth/users/?search=${query}&page=${p}`);
    setResults(res.data.results);
    setTotalCount(res.data.count);
    setPage(p);
  };

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSearched(true);
    await fetchPage(1);
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
          onChange={(e) => { setQuery(e.target.value); setSearched(false); }}
          autoComplete="off"
        />
        <Button type="submit">Buscar</Button>
      </SearchForm>

      {!searched && suggestions.length > 0 && (
        <>
          <Title style={{ fontSize: "0.85rem", color: "inherit" }}>Mais relevantes</Title>
          {suggestions.map((u) => renderCard(u, true))}
        </>
      )}

      {searched && results.map((u) => renderCard(u, false))}

      {searched && totalPages > 1 && (
        <Pagination>
          <PageBtn onClick={() => fetchPage(page - 1)} disabled={page === 1}>Anterior</PageBtn>
          <PageInfo>{page} / {totalPages}</PageInfo>
          <PageBtn onClick={() => fetchPage(page + 1)} disabled={page === totalPages}>Próximo</PageBtn>
        </Pagination>
      )}
    </Container>
  );
};

export default SearchPage;
