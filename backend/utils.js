export function formatPostDate(date) {
  const now = new Date();
  const diffSeconds = Math.floor((now - date) / 1000);
  
  const days = Math.floor(diffSeconds / 86400);
  if (days >= 7) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  const hours = Math.floor(diffSeconds / 3600);
  if (hours >= 1) return hours + "h ago";

  const minutes = Math.floor(diffSeconds / 60);
  if (minutes >= 1) return minutes + "m ago";

  return Math.floor(diffSeconds) + "s ago";
}