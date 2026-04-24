const GIF_HOSTNAMES = [
  'media.giphy.com',
  'media.tenor.com',
  'i.imgur.com',
  'media.discordapp.net',
  'cdn.discordapp.com',
];

export const isGifUrl = (text: string): boolean => {
  const trimmed = text.trim();
  try {
    const url = new URL(trimmed);
    return (
      url.pathname.toLowerCase().endsWith('.gif') ||
      GIF_HOSTNAMES.includes(url.hostname)
    );
  } catch {
    return false;
  }
};
