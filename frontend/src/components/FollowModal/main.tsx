import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import api from "../../api/axios";
import perfilPadrao from "../../assets/perfil_padrao.png";
import { Overlay, Modal, ModalHeader, ModalTitle, CloseButton, UserList, UserItem, UserAvatar, UserName, Empty } from "./style";

interface User {
  id: number;
  username: string;
  avatar: string | null;
}

interface Props {
  userId: number;
  type: "followers" | "following";
  onClose: () => void;
}

const FollowModal = ({ userId, type, onClose }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/follows/${userId}/${type}/`).then((res) => setUsers(res.data));
  }, [userId, type]);

  const handleUserClick = (id: number) => {
    onClose();
    navigate(`/users/${id}`);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{type === "followers" ? "Seguidores" : "Seguindo"}</ModalTitle>
          <CloseButton onClick={onClose}><X size={16} /></CloseButton>
        </ModalHeader>
        <UserList>
          {users.length === 0 && <Empty>Nenhum usuário encontrado.</Empty>}
          {users.map((u) => (
            <UserItem key={u.id} onClick={() => handleUserClick(u.id)}>
              <UserAvatar src={u.avatar || perfilPadrao} alt="avatar" />
              <UserName>{u.username}</UserName>
            </UserItem>
          ))}
        </UserList>
      </Modal>
    </Overlay>
  );
};

export default FollowModal;
