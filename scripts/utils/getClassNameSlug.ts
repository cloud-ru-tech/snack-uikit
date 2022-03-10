import config from '../../package.json';

export function getClassNameSlug(version: string) {
  return function (hash: string, title: string) {
    return `${config.name}-${title}-${version}-${hash}`;
  };
}
