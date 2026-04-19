const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = Math.floor((Date.now() - date.getTime()) / 3600000);

  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min`;
  if (hours < 24) return `${hours} h`;

  return `${date.getDate()} de ${MONTHS[date.getMonth()]}`;
}
