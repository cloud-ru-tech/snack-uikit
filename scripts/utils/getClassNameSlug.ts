import { name } from '../../package.json';

export function getClassNameSlug(version: string) {
  return function (hash: string, title: string) {
    return `${name}-${title}-${version}-${hash}`;
  };
}
