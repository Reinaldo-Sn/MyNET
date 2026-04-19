import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostContext } from "../../contexts/PostContext";
import api from "../../api/axios";
import perfilPadrao from "../../assets/perfil_padrao.png";
import { Nav, Logo, NavLinks, NavLink, Button, SearchWrapper, SearchInput, SearchResults, UserCard, UserAvatar, UserName } from './style';

interface UserResult {
  id: number;
  username: string;
  avatar: string | null;
}

const Navbar = () => {
    const { openModal } = usePostContext();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<UserResult[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.trim().length < 2) { setResults([]); return; }
        const timer = setTimeout(() => {
            api.get(`/auth/users/?search=${query}`)
                .then((res) => setResults(res.data))
                .catch(() => setResults([]));
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (id: number) => {
        setQuery("");
        navigate(`/users/${id}`);
    };

    return (
        <Nav>
            <Logo to="/feed">MyNET</Logo>
            <SearchWrapper ref={wrapperRef}>
                <SearchInput
                    placeholder="Buscar usuários..."
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                />
                {query.trim().length >= 2 && results.length > 0 && (
                    <SearchResults>
                        {results.map((u) => (
                            <UserCard key={u.id} onClick={() => handleSelect(u.id)}>
                                <UserAvatar src={u.avatar || perfilPadrao} alt="avatar" />
                                <UserName>{u.username}</UserName>
                            </UserCard>
                        ))}
                    </SearchResults>
                )}
            </SearchWrapper>
            <NavLinks>
                <NavLink to="/feed">Página inicial</NavLink>
                <NavLink to="/search">Explorar</NavLink>
                <NavLink to="/profile">Perfil</NavLink>
                <Button onClick={openModal}>Postar</Button>
            </NavLinks>
        </Nav>
    );
};

export default Navbar;
