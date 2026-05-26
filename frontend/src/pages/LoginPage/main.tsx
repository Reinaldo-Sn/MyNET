import { useState, FormEvent } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useThemeToggle } from "../../contexts/ThemeContext";
import coruja from "../../assets/corujapreta.png";
import { Container, Card, Title, Input, Button, ErrorMsg, LinkText } from "./style";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/feed" replace />;
  const { isDark, toggleTheme } = useThemeToggle();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.username, form.password);
      navigate("/feed");
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      setError(detail || "Email/usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <img src={coruja} alt="coruja" onClick={toggleTheme} style={{ height: "64px", marginBottom: "1rem", filter: isDark ? "brightness(0) invert(1)" : "none", cursor: "pointer" }} />
      <Card>
        <Title>MyNET</Title>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <Input
            placeholder="Email ou usuário"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" disabled={loading} $loading={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <LinkText>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </LinkText>
      </Card>
    </Container>
  );
}

export default LoginPage