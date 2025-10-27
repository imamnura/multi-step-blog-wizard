export const formatDate = (iso: string) => new Date(iso).toLocaleString();

export const isWithinDateRange = (
  iso: string,
  start?: string,
  end?: string
) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  if (start) {
    const s = new Date(start + "T00:00:00");
    if (d < s) return false;
  }
  if (end) {
    const e = new Date(end + "T23:59:59");
    if (d > e) return false;
  }
  return true;
};
