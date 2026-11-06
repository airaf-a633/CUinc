const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function ordinal(n: number) {
  const s = n % 100;
  if (s >= 11 && s <= 13) return `${n}th`;
  const suffix: Record<number, string> = { 1: 'st', 2: 'nd', 3: 'rd' };
  return `${n}${suffix[n % 10] ?? 'th'}`;
}

/** "August 1st, 2025 at 3:40 PM" (matches the Turned On design). */
export function formatActivityDate(iso: string): string {
  const d = new Date(iso);
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${MONTHS[d.getMonth()]} ${ordinal(d.getDate())}, ${d.getFullYear()} at ${hour12}:${m} ${h < 12 ? 'AM' : 'PM'}`;
}

/** US national number: digits only, a leading country code 1 (from paste/autofill) is dropped. */
export function nationalDigits(input: string): string {
  const all = input.replace(/\D/g, '');
  return (all.length > 10 && all[0] === '1' ? all.slice(1) : all).slice(0, 10);
}

/** "(912)555-5555" while typing, matching the Login design. */
export function formatPhone(input: string): string {
  const d = nationalDigits(input);
  if (d.length === 0) return '';
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)})${d.slice(3)}`;
  return `(${d.slice(0, 3)})${d.slice(3, 6)}-${d.slice(6)}`;
}
