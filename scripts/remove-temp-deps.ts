import fs from 'fs';
import path from 'path';

import * as YAML from 'yaml';

type PackageJson = {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
};

const readFileSync = (filePath: string): string =>
    fs.readFileSync(filePath, 'utf-8');

const writeFileSync = (filePath: string, data: string) => {
    fs.writeFileSync(filePath, data);
};

const loadYAML = <T extends Record<string, never>>(filePath: string): T =>
    YAML.parse(readFileSync(filePath)) as T;

const saveYAML = (filePath: string, data: object) => {
    writeFileSync(filePath, YAML.stringify(data));
};

const extractPackageName = (pkgWithVersion: string): string => {
    const isScopedPackage = pkgWithVersion.startsWith('@');
    const parts = pkgWithVersion.split('@');
    return isScopedPackage ? parts.slice(0, 2).join('@') : parts[0];
};

const removeDependencies = (dependencies: Record<string, unknown> | undefined, pkgName: string) => {
    if (!dependencies) return;

    for (const key of Object.keys(dependencies)) {
        if (key === pkgName || key.startsWith(pkgName + '@')) {
            delete dependencies[key];
        }
    }
};

const removeFromPackageJson = (depsWithVersion: string[]) => {
    const packageJsonPath = path.join(__dirname, '../package.json');
    const packageJson: PackageJson = JSON.parse(readFileSync(packageJsonPath));

    depsWithVersion
        .map(extractPackageName)
        .forEach(pkgName => {
            removeDependencies(packageJson.dependencies, pkgName);
            removeDependencies(packageJson.devDependencies, pkgName);
        });

    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('Temporary dependencies removed from package.json');
};

const removePackageRecursively = (obj: Record<string, never>, pkgName: string) => {
    if (typeof obj !== 'object' || obj === null) return;

    for (const key of Object.keys(obj)) {
        if (key === pkgName || key.startsWith(pkgName + '@')) {
            delete obj[key];
        } else {
            removePackageRecursively(obj[key], pkgName);
        }
    }
};

export const removeFromPnpmLock = (depsWithVersion: string[]) => {
    const pnpmLockPath = path.join(__dirname, '../pnpm-lock.yaml');
    const pnpmLock = loadYAML(pnpmLockPath);

    depsWithVersion.map(extractPackageName)
        .forEach(pkgName => removePackageRecursively(pnpmLock, pkgName));

    saveYAML(pnpmLockPath, pnpmLock);
    console.log('Temporary dependencies removed from pnpm-lock.yaml');
};

export const removeTempDeps = (deps: string[]) => {
    removeFromPnpmLock(deps);
    removeFromPackageJson(deps);
};