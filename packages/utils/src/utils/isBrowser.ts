export function isBrowser() {
  // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
}
