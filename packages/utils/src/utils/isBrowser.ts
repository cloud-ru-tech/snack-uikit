export function isBrowser() {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}
