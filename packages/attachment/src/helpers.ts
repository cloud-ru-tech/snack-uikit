export function getBaseFileName(fileName?: string) {
  if (!fileName) {
    return fileName;
  }

  const parts = fileName.split('.');
  parts.pop();

  // Для отображения названия файлов без имени (например, .bashrc, .gitignore)
  if (parts.length === 1 && parts[0] === '') return fileName;

  return parts.join('.');
}

export function getFileExtension(fileName?: string) {
  return fileName?.split('.').pop()?.toLocaleUpperCase();
}

export function isFileImage(file: File) {
  return file.type.match(/image\/(png|jpg|jpeg|gif|webp|bmp|svg)/i);
}
