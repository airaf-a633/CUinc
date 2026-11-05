// Phone number carried from the Login screen to the PIN screen. Kept in memory (not in the
// URL) so personal data never ends up in browser history or logs.
let pending = '';

export const setPendingPhone = (digits: string) => {
  pending = digits;
};
export const getPendingPhone = () => pending;
export const clearPendingPhone = () => {
  pending = '';
};
