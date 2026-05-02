import { useState, useEffect, useRef, FormEvent, useCallback } from "react";
import defaultAvatar from "../../assets/perfil_padrao.png";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Pencil, Trash2, X, Repeat2 } from "lucide-react";
import api from "../../api/axios";
import { timeAgo } from "../../utils/timeAgo";
import { renderWithMentions } from "../../utils/mentions";
import {
  Card, AuthorRow, AuthorAvatar, Author,
  Content, PostImage, Footer, FooterLeft,
  LikeButton, LikeTooltipWrap, LikeTooltip, LikeTooltipName, LikeTooltipSep,
  PinHeader, PinButton, RepostHeader, RepostButton,
  RepostTooltipWrap, RepostTooltip, RepostTooltipName,
  CommentToggle, EditButton, DeleteButton, DateText,
  EditArea, EditActions, SaveButton, CancelButton,
  CommentsSection, CommentItem, CommentText, CommentMeta, CommentDate, CommentDelete,
  CommentForm, CommentInput, CommentSubmit,
  CommentBody, CommentGif, SeeMoreButton, YoutubeEmbed,
} from "./style";
import { Pin } from "lucide-react";
import { extractYouTubeId, stripYouTubeUrl } from "../../utils/youtube";
import { isGifUrl } from "../../utils/gif";
import CommentRepliesModal from "../CommentRepliesModal/main";
import GifImage from "../GifImage";
import MentionSuggestions from "../MentionSuggestions";
import { useMentionInput } from "../../hooks/useMentionInput";

export interface Post {
  id: number;
  author: number;
  author_username: string;
  author_avatar: string | null;
  content: string;
  image: string | null;
  gif_url: string | null;
  likes_count: number;
  is_liked: boolean;
  comments_count: number;
  reposts_count: number;
  is_reposted: boolean;
  created_at: string;
  repost_of: Post | null;
}

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
  post: Post;
  currentUserId: number;
  onLike: (postId: number) => void;
  onRepost: (postId: number) => void;
  onDelete: (postId: number) => void;
  onEdit: (postId: number, newContent: string) => void;
  onPin?: (postId: number) => void;
  pinnedPostId?: number | null;
  autoShowComments?: boolean;
  commentLimit?: number;
}

const PostCard = ({ post, currentUserId, onLike, onRepost, onDelete, onEdit, onPin, pinnedPostId, autoShowComments, commentLimit }: Props) => {
  const navigate = useNavigate();
  // ep = post efetivo a exibir (o original se for repost, ou o próprio post)
  const ep = post.repost_of ?? post;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState(ep.comments_count);
  const [newComment, setNewComment] = useState("");
  const mention = useMentionInput(newComment, setNewComment);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(ep.content);
  const [activeReplyComment, setActiveReplyComment] = useState<Comment | null>(null);
  const [likeTooltip, setLikeTooltip] = useState<string[]>([]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPress = useRef(false);
  const [repostTooltip, setRepostTooltip] = useState<string[]>([]);
  const [repostTooltipVisible, setRepostTooltipVisible] = useState(false);
  const repostLongPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repostHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRepostLongPress = useRef(false);

  useEffect(() => {
    return () => {
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (repostLongPressTimer.current) clearTimeout(repostLongPressTimer.current);
      if (repostHideTimer.current) clearTimeout(repostHideTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!autoShowComments) return;
    api.get(`/posts/${ep.id}/comments/`).then((res) => {
      setComments(res.data);
      setCommentsLoaded(true);
      setShowComments(true);
    });
  }, [autoShowComments, ep.id]);

  const toggleComments = async () => {
    if (!commentsLoaded) {
      const res = await api.get(`/posts/${ep.id}/comments/`);
      setComments(res.data);
      setCommentsLoaded(true);
    }
    setShowComments((prev) => !prev);
  };

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const res = await api.post(`/posts/${ep.id}/comments/`, { content: newComment });
    setComments((prev) => [...prev, { ...res.data, replies: [] }]);
    setCommentsCount((prev) => prev + 1);
    setNewComment("");
  };

  const handleReplyAdded = useCallback((commentId: number, reply: Comment) => {
    setComments((prev) => prev.map((c) =>
      c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c
    ));
  }, []);

  const handleReplyDeleted = useCallback((commentId: number, replyId: number) => {
    setComments((prev) => prev.map((c) =>
      c.id === commentId ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) } : c
    ));
  }, []);

  const handleCommentLike = async (e: React.MouseEvent, commentId: number) => {
    e.stopPropagation();
    await api.post(`/posts/${ep.id}/comments/${commentId}/like/`);
    setComments((prev) => prev.map((c) =>
      c.id === commentId
        ? { ...c, is_liked: !c.is_liked, likes_count: c.is_liked ? c.likes_count - 1 : c.likes_count + 1 }
        : c
    ));
  };

  const handleDeleteComment = async (commentId: number) => {
    await api.delete(`/posts/${ep.id}/comments/${commentId}/`);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    setCommentsCount((prev) => prev - 1);
  };

  const handleDelete = async () => {
    await api.delete(`/posts/${post.id}/`);
    onDelete(post.id);
  };

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editContent.trim()) return;
    await api.patch(`/posts/${ep.id}/`, { content: editContent });
    onEdit(ep.id, editContent);
    setEditing(false);
  };

  const handleLikePressStart = () => {
    isLongPress.current = false;
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null; }
    longPressTimer.current = setTimeout(async () => {
      isLongPress.current = true;
      try {
        const res = await api.get(`/posts/${ep.id}/likers/`);
        setLikeTooltip(res.data.map((l: { display_name: string }) => l.display_name));
      } catch { setLikeTooltip([]); }
      setTooltipVisible(true);
    }, 500);
  };

  const handleLikePressEnd = () => {
    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
    if (isLongPress.current) {
      hideTimer.current = setTimeout(() => setTooltipVisible(false), 1500);
    }
  };

  const handleLikeClick = () => {
    if (isLongPress.current) { isLongPress.current = false; return; }
    onLike(ep.id);
  };

  const handleRepostPressStart = () => {
    isRepostLongPress.current = false;
    if (repostHideTimer.current) { clearTimeout(repostHideTimer.current); repostHideTimer.current = null; }
    repostLongPressTimer.current = setTimeout(async () => {
      isRepostLongPress.current = true;
      try {
        const res = await api.get(`/posts/${ep.id}/reposters/`);
        setRepostTooltip(res.data.map((r: { display_name: string }) => r.display_name));
      } catch { setRepostTooltip([]); }
      setRepostTooltipVisible(true);
    }, 500);
  };

  const handleRepostPressEnd = () => {
    if (repostLongPressTimer.current) { clearTimeout(repostLongPressTimer.current); repostLongPressTimer.current = null; }
    if (isRepostLongPress.current) {
      repostHideTimer.current = setTimeout(() => setRepostTooltipVisible(false), 1500);
    }
  };

  const handleRepostClick = () => {
    if (isRepostLongPress.current) { isRepostLongPress.current = false; return; }
    onRepost(ep.id);
  };

  const canDelete = post.author === currentUserId;
  const canEdit = !post.repost_of && post.author === currentUserId;
  const canPin = !!onPin && !post.repost_of && post.author === currentUserId;
  const isPinned = pinnedPostId === post.id;

  return (
    <>
    <Card>
      {isPinned && (
        <PinHeader>
          <Pin size={12} /> Fixado
        </PinHeader>
      )}
      {post.repost_of && (
        <RepostHeader>
          <Repeat2 size={12} /> {post.author_username} republicou
        </RepostHeader>
      )}

      <AuthorRow onClick={() => navigate(ep.author === currentUserId ? `/profile` : `/users/${ep.author}`)}>
        <AuthorAvatar src={ep.author_avatar || defaultAvatar} alt={ep.author_username} />
        <Author>{ep.author_username}</Author>
      </AuthorRow>

      {editing ? (
        <EditActions as="form" onSubmit={handleSaveEdit} style={{ flexDirection: "column" }}>
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
        <Content style={{ cursor: "pointer" }} onClick={() => navigate(`/posts/${ep.id}`)}>
          {renderWithMentions(extractYouTubeId(ep.content) ? stripYouTubeUrl(ep.content) : ep.content)}
        </Content>
      )}

      {!editing && (() => {
        const ytId = extractYouTubeId(ep.content);
        return ytId ? (
          <YoutubeEmbed>
            <iframe
              src={`https://www.youtube.com/embed/${ytId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </YoutubeEmbed>
        ) : null;
      })()}

      {ep.image && <PostImage src={ep.image} alt="imagem do post" style={{ cursor: "pointer" }} onClick={() => navigate(`/posts/${ep.id}`)} />}
      {ep.gif_url && <GifImage src={ep.gif_url} Img={PostImage} />}

      <Footer>
        <FooterLeft>
          <LikeTooltipWrap>
            <LikeTooltip $visible={tooltipVisible}>
              {likeTooltip.length === 0 ? "Ninguém curtiu ainda" : likeTooltip.map((name, i) => (
                <span key={i}>
                  <LikeTooltipName>{name}</LikeTooltipName>
                  {i < likeTooltip.length - 1 && <LikeTooltipSep>,</LikeTooltipSep>}
                </span>
              ))}
            </LikeTooltip>
            <LikeButton
              $liked={ep.is_liked}
              onClick={handleLikeClick}
              onMouseDown={handleLikePressStart}
              onMouseUp={handleLikePressEnd}
              onMouseLeave={handleLikePressEnd}
              onTouchStart={handleLikePressStart}
              onTouchEnd={handleLikePressEnd}
            >
              <Heart size={14} fill={ep.is_liked ? "currentColor" : "none"} />
              <span style={{ lineHeight: 1, minWidth: "2ch", display: "inline-block" }}>{ep.likes_count}</span>
            </LikeButton>
          </LikeTooltipWrap>
          <CommentToggle onClick={toggleComments}>
            <MessageCircle size={14} /> {commentsCount}
          </CommentToggle>
          {!post.repost_of && ep.author !== currentUserId && (
            <RepostTooltipWrap>
              <RepostTooltip $visible={repostTooltipVisible}>
                {repostTooltip.length === 0 ? "Ninguém republicou ainda" : repostTooltip.map((name, i) => (
                  <span key={i}>
                    <RepostTooltipName>{name}</RepostTooltipName>
                    {i < repostTooltip.length - 1 && <LikeTooltipSep>,</LikeTooltipSep>}
                  </span>
                ))}
              </RepostTooltip>
              <RepostButton
                $reposted={ep.is_reposted}
                onClick={handleRepostClick}
                onMouseDown={handleRepostPressStart}
                onMouseUp={handleRepostPressEnd}
                onMouseLeave={handleRepostPressEnd}
                onTouchStart={handleRepostPressStart}
                onTouchEnd={handleRepostPressEnd}
              >
                <Repeat2 size={14} />
                <span style={{ lineHeight: 1, minWidth: "2ch", display: "inline-block" }}>{ep.reposts_count}</span>
              </RepostButton>
            </RepostTooltipWrap>
          )}
        </FooterLeft>
        <FooterLeft>
          <DateText>{timeAgo(ep.created_at)}</DateText>
          {canPin && (
            <PinButton $pinned={isPinned} onClick={() => onPin!(post.id)} title={isPinned ? "Desafixar" : "Fixar no perfil"}>
              <Pin size={13} />
            </PinButton>
          )}
          {canEdit && (
            <EditButton onClick={() => setEditing(true)}><Pencil size={13} /></EditButton>
          )}
          {canDelete && (
            <DeleteButton onClick={handleDelete}><Trash2 size={13} /></DeleteButton>
          )}
        </FooterLeft>
      </Footer>

      {showComments && (
        <CommentsSection>
          {(commentLimit ? comments.slice(0, commentLimit) : comments).map((c) => (
            <CommentItem key={c.id} onClick={() => setActiveReplyComment(c)} style={{ cursor: "pointer" }}>
              <CommentText>
                <CommentMeta>
                  <AuthorAvatar src={c.author_avatar || defaultAvatar} alt={c.author_username} style={{ width: 22, height: 22 }} />
                  <span style={{ cursor: "pointer" }} onClick={(e) => { e.stopPropagation(); navigate(c.author === currentUserId ? `/profile` : `/users/${c.author}`); }}>{c.author_username}</span>
                  <CommentDate>{timeAgo(c.created_at)}</CommentDate>
                </CommentMeta>
                {isGifUrl(c.content)
                  ? <GifImage src={c.content.trim()} Img={CommentGif} />
                  : <CommentBody>{renderWithMentions(c.content)}</CommentBody>
                }
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "4px", fontSize: "0.78rem" }}>
                  <button
                    onClick={(e) => handleCommentLike(e, c.id)}
                    style={{
                      background: "none", border: "none", cursor: "pointer", padding: 0,
                      display: "flex", alignItems: "center", gap: "0.25rem",
                      minWidth: "2rem",
                      color: c.is_liked ? "var(--accent, #7c6af7)" : "inherit",
                      opacity: c.is_liked ? 1 : 0.45, fontSize: "0.78rem", fontFamily: "inherit",
                    }}
                  >
                    <Heart size={13} fill={c.is_liked ? "currentColor" : "none"} />
                    {c.likes_count > 0 && <span style={{ lineHeight: 1 }}>{c.likes_count}</span>}
                  </button>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", opacity: 0.45 }}>
                    <MessageCircle size={13} />
                    {c.replies.length > 0 && <span>{c.replies.length}</span>}
                  </span>
                </div>
              </CommentText>
              {c.author === currentUserId && (
                <CommentDelete onClick={(e) => { e.stopPropagation(); handleDeleteComment(c.id); }}><X size={12} /></CommentDelete>
              )}
            </CommentItem>
          ))}
          {commentLimit && comments.length > commentLimit && (
            <SeeMoreButton onClick={() => navigate(`/posts/${ep.id}`)}>
              Ver mais {comments.length - commentLimit} comentário{comments.length - commentLimit > 1 ? 's' : ''}
            </SeeMoreButton>
          )}
          <CommentForm onSubmit={handleComment} style={{ position: "relative" }}>
            <MentionSuggestions results={mention.mentionResults} onSelect={mention.insertMention} />
            <CommentInput
              ref={mention.inputRef}
              placeholder="Escreva um comentário..."
              value={newComment}
              maxLength={280}
              onChange={mention.handleChange}
            />
            <CommentSubmit type="submit">Enviar</CommentSubmit>
          </CommentForm>
        </CommentsSection>
      )}
    </Card>

    {activeReplyComment && (
      <CommentRepliesModal
        postId={ep.id}
        comment={activeReplyComment}
        currentUserId={currentUserId}
        onClose={() => setActiveReplyComment(null)}
        onReplyAdded={handleReplyAdded}
        onReplyDeleted={handleReplyDeleted}
      />
    )}
    </>
  );
};

export default PostCard;
