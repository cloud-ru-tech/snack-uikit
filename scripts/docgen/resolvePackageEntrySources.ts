import fs from 'fs';
import path from 'path';

export type PackageJson = {
  exports?: string | Record<string, string | Record<string, string>>;
};

export function extractImportFromExportValue(value: unknown): string | null {
  if (typeof value === 'string') {
    return value;
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const entry = value as Record<string, unknown>;
    if (typeof entry.import === 'string') {
      return entry.import;
    }
    if (typeof entry.require === 'string') {
      return entry.require;
    }
  }
  return null;
}

function compareExportsSubpathKeys(a: string, b: string): number {
  if (a === '.') {
    return -1;
  }
  if (b === '.') {
    return 1;
  }
  return a.localeCompare(b);
}

/**
 * Collects ESM bundle paths from `package.json` `exports` (main entry and subpaths like `./hooks`).
 */
export function collectExportImportPaths(exportsField: PackageJson['exports']): string[] {
  if (!exportsField) {
    return [];
  }

  if (typeof exportsField === 'string') {
    return [exportsField];
  }
  const record = exportsField as Record<string, unknown>;
  const keys = Object.keys(record);

  const hasSubpathExports = keys.some(key => key === '.' || key.startsWith('./'));
  if (!hasSubpathExports) {
    const bundlePath = extractImportFromExportValue(record);
    return bundlePath ? [bundlePath] : [];
  }

  const subpathKeys = keys.sort(compareExportsSubpathKeys);
  return subpathKeys
    .map(key => extractImportFromExportValue(record[key]))
    .filter((importPath): importPath is string => importPath !== null);
}

export function distBundlePathToSourceCandidates(packageRoot: string, bundleRelativePath: string): string[] {
  const normalized = bundleRelativePath.replace(/^\.\//, '');
  const withSrc = normalized.replace(/^dist\/(?:esm|cjs)\//, 'src/').replace(/\.js$/, '');
  const base = path.join(packageRoot, withSrc);
  return [`${base}.ts`, `${base}.tsx`];
}

export function resolvePackageEntrySourcePaths(packagesRoot: string, packageName: string): string[] {
  const packageRoot = path.resolve(packagesRoot, packageName);
  const packageJsonPath = path.join(packageRoot, 'package.json');
  let packageJson: PackageJson;

  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson;
  } catch (_e) {
    console.warn(`Error while reading package.json in "${packageName}", fallback to src/index.ts.`);
    return [path.join(packageRoot, 'src', 'index.ts')];
  }

  const importPaths = collectExportImportPaths(packageJson.exports);
  if (importPaths.length === 0) {
    console.warn(`No exports entry for "${packageName}", fallback to src/index.ts.`);
    return [path.join(packageRoot, 'src', 'index.ts')];
  }

  const resolvedPaths: string[] = [];
  const seenAbsolute = new Set<string>();

  for (const importPath of importPaths) {
    const candidates = distBundlePathToSourceCandidates(packageRoot, importPath);
    const found = candidates.find(candidate => fs.existsSync(candidate));
    if (found && !seenAbsolute.has(found)) {
      seenAbsolute.add(found);
      resolvedPaths.push(found);
    } else if (!found) {
      console.warn(`Could not resolve source for exports import "${importPath}" in "${packageName}", skipped.`);
    }
  }

  if (resolvedPaths.length === 0) {
    console.warn(`No resolved entry sources for "${packageName}", fallback to src/index.ts.`);
    return [path.join(packageRoot, 'src', 'index.ts')];
  }

  return resolvedPaths;
}
