import { useState, useRef, useEffect } from "react";
import api from "../api/axios";

export interface MentionUser {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
}

export function useMentionInput(value: string, setValue: (v: string) => void) {
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const [mentionIndex, setMentionIndex] = useState(0);
  const [mentionResults, setMentionResults] = useState<MentionUser[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (mentionQuery === null || mentionQuery.length === 0) {
      setMentionResults([]);
      return;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      api.get(`/auth/users/?search=${mentionQuery}`)
        .then((r) => setMentionResults((r.data.results ?? r.data).slice(0, 6)))
        .catch(() => {});
    }, 200);
  }, [mentionQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const pos = e.target.selectionStart ?? val.length;
    setValue(val);
    const textBefore = val.slice(0, pos);
    const match = textBefore.match(/@(\w*)$/);
    if (match) {
      setMentionQuery(match[1]);
      setMentionIndex(pos - match[0].length);
    } else {
      setMentionQuery(null);
      setMentionResults([]);
    }
  };

  const insertMention = (username: string) => {
    const pos = inputRef.current?.selectionStart ?? value.length;
    const before = value.slice(0, mentionIndex);
    const after = value.slice(pos);
    const newVal = `${before}@${username} ${after}`;
    setValue(newVal);
    setMentionResults([]);
    setMentionQuery(null);
    setTimeout(() => {
      if (inputRef.current) {
        const newPos = before.length + username.length + 2;
        inputRef.current.focus();
        inputRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  const clearMentions = () => {
    setMentionResults([]);
    setMentionQuery(null);
  };

  return { inputRef, handleChange, mentionResults, insertMention, clearMentions };
}
