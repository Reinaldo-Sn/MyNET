import { useState, useRef, FormEvent, useEffect } from "react";
import { X, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import defaultAvatar from "../../assets/perfil_padrao.png";
import { timeAgo } from "../../utils/timeAgo";
import { isGifUrl } from "../../utils/gif";
import { renderWithMentions } from "../../utils/mentions";
import GifImage from "../GifImage";
import MentionSuggestions from "../MentionSuggestions";
import { useMentionInput } from "../../hooks/useMentionInput";
import {
  Overlay, Modal, Header, Title, CloseBtn,
  ParentComment, ReplyList, ReplyItem, ReplyMeta,
  ReplyAvatar, ReplyAuthor, ReplyDate, ReplyBody, ReplyGif,
  DeleteBtn, Form, Input, SubmitBtn, Empty,
} from "./style";

interface Comment {
  id: number;
  author: number;
  author_username: string;
  author_avatar: string | null;
  content: string;
  created_at: string;
  parent: number | null;
  replies: Comment[];
  likes_count: number;
  is_liked: boolean;
}

interface Props {
  postId: number;
  comment: Comment;
  currentUserId: number;
  onClose: () => void;
  onReplyAdded: (commentId: number, reply: Comment) => void;
  onReplyDeleted: (commentId: number, replyId: number) => void;
}

const CommentRepliesModal = ({ postId, comment, currentUserId, onClose, onReplyAdded, onReplyDeleted }: Props) => {
  const navigate = useNavigate();
  const [replies, setReplies] = useState<Comment[]>(comment.replies);
  const [text, setText] = useState("");
  const mention = useMentionInput(text, setText);
  const inputRef = mention.inputRef;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    bottomRef.current?.scrollIntoView();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [replies]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await api.post(`/posts/${postId}/comments/`, { content: text, parent: comment.id });
    const newReply = { ...res.data, replies: [] };
    setReplies((prev) => [...prev, newReply]);
    onReplyAdded(comment.id, newReply);
    setText("");
  };

  const handleReplyLike = async (replyId: number) => {
    await api.post(`/posts/${postId}/comments/${replyId}/like/`);
    setReplies((prev) => prev.map((r) =>
      r.id === replyId
        ? { ...r, is_liked: !r.is_liked, likes_count: r.is_liked ? r.likes_count - 1 : r.likes_count + 1 }
        : r
    ));
  };

  const handleDelete = async (replyId: number) => {
    await api.delete(`/posts/${postId}/comments/${replyId}/`);
    setReplies((prev) => prev.filter((r) => r.id !== replyId));
    onReplyDeleted(comment.id, replyId);
  };

  const goToUser = (userId: number) => {
    onClose();
    navigate(userId === currentUserId ? "/profile" : `/users/${userId}`);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Respostas</Title>
          <CloseBtn onClick={onClose}><X size={16} /></CloseBtn>
        </Header>

        <ParentComment>
          <ReplyMeta>
            <ReplyAvatar src={comment.author_avatar || defaultAvatar} alt={comment.author_username} />
            <ReplyAuthor onClick={() => goToUser(comment.author)}>{comment.author_username}</ReplyAuthor>
            <ReplyDate>{timeAgo(comment.created_at)}</ReplyDate>
          </ReplyMeta>
          {isGifUrl(comment.content)
            ? <GifImage src={comment.content.trim()} Img={ReplyGif} />
            : <ReplyBody>{renderWithMentions(comment.content)}</ReplyBody>
          }
        </ParentComment>

        <Form onSubmit={handleSubmit} style={{ position: "relative" }}>
          <MentionSuggestions results={mention.mentionResults} onSelect={mention.insertMention} />
          <Input
            ref={inputRef}
            value={text}
            onChange={mention.handleChange}
            placeholder={`Responder ${comment.author_username}...`}
            maxLength={280}
          />
          <SubmitBtn type="submit">Responder</SubmitBtn>
        </Form>

        <ReplyList>
          {replies.length === 0 && <Empty>Nenhuma resposta ainda.</Empty>}
          {replies.map((r) => (
            <ReplyItem key={r.id}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <ReplyMeta>
                  <ReplyAvatar src={r.author_avatar || defaultAvatar} alt={r.author_username} style={{ width: 22, height: 22 }} />
                  <ReplyAuthor onClick={() => goToUser(r.author)}>{r.author_username}</ReplyAuthor>
                  <ReplyDate>{timeAgo(r.created_at)}</ReplyDate>
                </ReplyMeta>
                {isGifUrl(r.content)
                  ? <GifImage src={r.content.trim()} Img={ReplyGif} />
                  : <ReplyBody>{renderWithMentions(r.content)}</ReplyBody>
                }
                <button
                  onClick={() => handleReplyLike(r.id)}
                  style={{
                    background: "none", border: "none", cursor: "pointer", padding: 0,
                    display: "flex", alignItems: "center", gap: "0.25rem",
                    color: r.is_liked ? "var(--accent, #7c6af7)" : "inherit",
                    opacity: r.is_liked ? 1 : 0.45, fontSize: "0.78rem", fontFamily: "inherit",
                    marginTop: "4px",
                  }}
                >
                  <Heart size={13} fill={r.is_liked ? "currentColor" : "none"} />
                  {r.likes_count > 0 && <span>{r.likes_count}</span>}
                </button>
              </div>
              {r.author === currentUserId && (
                <DeleteBtn onClick={() => handleDelete(r.id)}><X size={12} /></DeleteBtn>
              )}
            </ReplyItem>
          ))}
          <div ref={bottomRef} />
        </ReplyList>
      </Modal>
    </Overlay>
  );
};

export default CommentRepliesModal;
