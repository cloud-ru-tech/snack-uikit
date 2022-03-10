import fs from 'fs';
import path from 'path';

export function ensureDirectory(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    ensureDirectory(dirname);
    fs.mkdirSync(dirname);
  }
}
