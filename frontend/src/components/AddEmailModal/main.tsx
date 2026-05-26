import { useState, FormEvent } from "react";
import api from "../../api/axios";
import { useAuth } from "../../contexts/AuthContext";
import { Overlay, Modal, Title, Description, Input, Button, SkipButton, ErrorMsg } from "./style";

interface Props {
  onClose: () => void;
}

const AddEmailModal = ({ onClose }: Props) => {
  const { updateUser } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/add-email/", { email });
      updateUser({ email: res.data.email });
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.email;
      setError(msg || "Erro ao salvar email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <Modal>
        <Title>Adicione seu email</Title>
        <Description>
          O MyNET agora usa email para login. Adicione um email à sua conta para continuar acessando normalmente.
        </Description>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : "Salvar email"}
          </Button>
        </form>
        <SkipButton type="button" onClick={onClose}>
          Agora não
        </SkipButton>
      </Modal>
    </Overlay>
  );
};

export default AddEmailModal;
