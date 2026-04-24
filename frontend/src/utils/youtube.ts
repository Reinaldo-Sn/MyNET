const YT_REGEX = /https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})[^\s]*/;

export const extractYouTubeId = (text: string): string | null => {
  const match = text.match(YT_REGEX);
  return match ? match[1] : null;
};

export const stripYouTubeUrl = (text: string): string =>
  text.replace(YT_REGEX, "").trim();
