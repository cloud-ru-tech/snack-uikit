import { exec } from 'shelljs';

type PackageItem = {
  location: string;
};

function isPackageItem(item: unknown): item is PackageItem {
  return Boolean(item && typeof item === 'object' && 'location' in item);
}

export function getChangedPackages(): string[] {
  const lernaResult = String(exec('lerna changed --json')).replaceAll('\n', '');
  let changedPackages: unknown;

  try {
    changedPackages = JSON.parse(lernaResult);
  } catch {
    changedPackages = [];
  }

  if (Array.isArray(changedPackages) && changedPackages.every(isPackageItem)) {
    return changedPackages.map(item => item.location);
  }

  return [];
}
