import { useEffect, useState } from "react";
import { Home, Search, Plus, MessageSquare, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePostContext } from "../../contexts/PostContext";
import api from "../../api/axios";
import { Wrap, NavBtn, CenterSlot, CenterBtn, NavBadge } from "./style";

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { openModal } = usePostContext();
  const [dmUnread, setDmUnread] = useState(0);

  useEffect(() => {
    const fetch = () =>
      api.get("/dms/unread/").then((r) => setDmUnread(r.data.count)).catch(() => {});
    fetch();
    const id = setInterval(fetch, 20000);
    return () => clearInterval(id);
  }, []);

  const toggleDm = () => window.dispatchEvent(new CustomEvent("dm-panel-toggle"));

  return (
    <Wrap>
      <NavBtn $active={pathname === "/feed"} onClick={() => navigate("/feed")}>
        <Home size={22} />
      </NavBtn>
      <NavBtn $active={pathname === "/search"} onClick={() => navigate("/search")}>
        <Search size={22} />
      </NavBtn>
      <CenterSlot>
        <CenterBtn onClick={openModal}>
          <Plus size={24} />
        </CenterBtn>
      </CenterSlot>
      <NavBtn onClick={toggleDm}>
        <MessageSquare size={22} />
        {dmUnread > 0 && <NavBadge>{dmUnread > 9 ? "9+" : dmUnread}</NavBadge>}
      </NavBtn>
      <NavBtn $active={pathname === "/profile"} onClick={() => navigate("/profile")}>
        <User size={22} />
      </NavBtn>
    </Wrap>
  );
};

export default BottomNav;
