import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Pencil, Trash2, X } from "lucide-react";
import api from "../../api/axios";
import {
  Card, Author, Content, PostImage, Footer, FooterLeft,
  LikeButton, CommentToggle, EditButton, DeleteButton, DateText,
  EditArea, EditActions, SaveButton, CancelButton,
  CommentsSection, CommentItem, CommentText, CommentDelete,
  CommentForm, CommentInput, CommentSubmit,
} from "./style";

export interface Post {
  id: number;
  author: number;
  author_username: string;
  content: string;
  image: string | null;
  likes_count: number;
  is_liked: boolean;
  comments_count: number;
  created_at: string;
}

interface Comment {
  id: number;
  author: number;
  author_username: string;
  content: string;
}

interface Props {
  post: Post;
  currentUserId: number;
  onLike: (postId: number) => void;
  onDelete: (postId: number) => void;
  onEdit: (postId: number, newContent: string) => void;
}

const PostCard = ({ post, currentUserId, onLike, onDelete, onEdit }: Props) => {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);

  const toggleComments = async () => {
    if (!commentsLoaded) {
      const res = await api.get(`/posts/${post.id}/comments/`);
      setComments(res.data);
      setCommentsLoaded(true);
    }
    setShowComments((prev) => !prev);
  };

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const res = await api.post(`/posts/${post.id}/comments/`, { content: newComment });
    setComments((prev) => [...prev, res.data]);
    setNewComment("");
  };

  const handleDeleteComment = async (commentId: number) => {
    await api.delete(`/posts/${post.id}/comments/${commentId}/`);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  const handleDelete = async () => {
    await api.delete(`/posts/${post.id}/`);
    onDelete(post.id);
  };

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editContent.trim()) return;
    await api.patch(`/posts/${post.id}/`, { content: editContent });
    onEdit(post.id, editContent);
    setEditing(false);
  };

  return (
    <Card>
      <Author>{post.author_username}</Author>

      {editing ? (
        <EditActions as="form" onSubmit={handleSaveEdit}>
          <EditArea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
          />
          <EditActions>
            <SaveButton type="submit">Salvar</SaveButton>
            <CancelButton type="button" onClick={() => setEditing(false)}>Cancelar</CancelButton>
          </EditActions>
        </EditActions>
      ) : (
        <Content style={{ cursor: "pointer" }} onClick={() => navigate(`/posts/${post.id}`)}>{post.content}</Content>
      )}

      {post.image && <PostImage src={post.image} alt="imagem do post" />}

      <Footer>
        <FooterLeft>
          <LikeButton $liked={post.is_liked} onClick={() => onLike(post.id)}>
            <Heart size={14} fill={post.is_liked ? "currentColor" : "none"} /> {post.likes_count}
          </LikeButton>
          <CommentToggle onClick={toggleComments}>
            <MessageCircle size={14} /> {post.comments_count}
          </CommentToggle>
        </FooterLeft>
        <FooterLeft>
          <DateText>{new window.Date(post.created_at).toLocaleDateString()}</DateText>
          {post.author === currentUserId && (
            <>
              <EditButton onClick={() => setEditing(true)}><Pencil size={13} /></EditButton>
              <DeleteButton onClick={handleDelete}><Trash2 size={13} /></DeleteButton>
            </>
          )}
        </FooterLeft>
      </Footer>

      {showComments && (
        <CommentsSection>
          {comments.map((c) => (
            <CommentItem key={c.id}>
              <CommentText>
                <span>{c.author_username}</span>{c.content}
              </CommentText>
              {c.author === currentUserId && (
                <CommentDelete onClick={() => handleDeleteComment(c.id)}><X size={12} /></CommentDelete>
              )}
            </CommentItem>
          ))}
          <CommentForm onSubmit={handleComment}>
            <CommentInput
              placeholder="Escreva um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <CommentSubmit type="submit">Enviar</CommentSubmit>
          </CommentForm>
        </CommentsSection>
      )}
    </Card>
  );
};

export default PostCard;
