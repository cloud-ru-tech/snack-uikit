import fileDownload from 'js-file-download';

type FileWithUrl = {
  path: string;
  content?: never;
};

type FileWithContent = {
  content: string | ArrayBuffer | ArrayBufferView | Blob;
  path?: never;
};

export type FileProps = {
  fileName: string;
} & (FileWithUrl | FileWithContent);

export function downloadFile({ content, path, fileName }: FileProps) {
  if (content) {
    fileDownload(content, fileName);
  }

  if (path) {
    const tempLink = Object.assign(document.createElement('a'), {
      target: '_blank',
      href: path,
      download: fileName,
    });

    tempLink.click();
    tempLink.remove();
  }
}

export function formatBytes(value: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (value === 0) return `0 ${sizes[0]}`;

  const decimals = 2;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(value) / Math.log(k));

  return `${parseFloat((value / k ** i).toFixed(dm))} ${sizes[i]}`;
}
