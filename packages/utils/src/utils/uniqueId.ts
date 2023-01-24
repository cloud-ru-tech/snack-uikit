const KEY = Symbol.for('SBERCLOUD_UIKIT_PRODUCT_UTILS_UNIQUE_ID_KEY');
const DEFAULT_NAMESPACE = '__DEFAULT_NAMESPACE__';

export function uniqueId(namespace = DEFAULT_NAMESPACE) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window[KEY] ??= {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window[KEY][namespace] ??= 0;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const id = ++window[KEY][namespace];

  return namespace === DEFAULT_NAMESPACE ? id.toString() : `${namespace}__${id}`;
}
