import { StoryObj } from '@storybook/react';
import { ReactNode, useEffect, useState } from 'react';

import { DropZone } from '@snack-uikit/drop-zone';
import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { getFileExtension } from '../src/helpers';
import { AttachmentProps, AttachmentSquareProps } from '../src/types';
import { DEFAULT_ARGS as DEFAULT_ARGS_PROP } from './constants';
import picture from './PictureProdContent.jpg';
import styled from './styles.module.scss';
import { STORY_TEST_IDS } from './testIds';
import { downloadFile, formatBytes } from './utils';

export type StoryProps = AttachmentProps & {
  exampleFile: 'img' | 'pdf';
  showDelete: boolean;
  showDownload: boolean;
  showClick: boolean;
  showRetry: boolean;
};

export function TemplateStory(Component: (props: AttachmentSquareProps | AttachmentProps) => ReactNode) {
  return function Template({ exampleFile, showDelete, showDownload, showClick, showRetry, ...args }: StoryProps) {
    const [defaultFile, setDefaultFile] = useState<{
      img?: File;
      pdf?: File;
    }>({});

    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    const loadDefaultFile = () => {
      setLoading(true);
      fetch(picture)
        .then(response => response.blob())
        .then(blob =>
          setDefaultFile({
            img: new File([blob], 'Picture.jpg', { type: 'image/jpg' }),
            pdf: new File([blob], 'File.pdf', { type: 'application/pdf' }),
          }),
        )
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
      loadDefaultFile();
    }, []);

    return (
      <div className={styled.wrapper}>
        <Component
          {...args}
          loading={loading || args.loading}
          file={defaultFile[exampleFile]}
          checked={checked}
          onClick={
            showClick
              ? () => {
                  toaster.userAction.neutral({ label: 'onClick', 'data-test-id': STORY_TEST_IDS.ClickAction });
                  setChecked(v => !v);
                }
              : undefined
          }
          onDelete={
            showDelete
              ? () => {
                  toaster.userAction.neutral({ label: 'onDelete', 'data-test-id': STORY_TEST_IDS.DeleteAction });
                }
              : undefined
          }
          onDownload={
            showDownload
              ? () => {
                  toaster.userAction.neutral({ label: 'onDownload', 'data-test-id': STORY_TEST_IDS.DownloadAction });
                }
              : undefined
          }
          onRetry={
            showRetry
              ? () => {
                  toaster.userAction.neutral({ label: 'onRetry', 'data-test-id': STORY_TEST_IDS.RetryAction });
                }
              : undefined
          }
        />

        <DropZone title='Drop files here' onFilesUpload={setFiles} />

        <div className={styled.filesContainer}>
          {files.map(file => (
            <Component
              file={file}
              key={file.name}
              onDownload={() => {
                downloadFile({ content: file, fileName: file.name });
              }}
              description={`${getFileExtension(file.name)?.toUpperCase()}, ${formatBytes(file.size)}`}
              onDelete={() => setFiles(files => files.filter(f => f.name !== file.name))}
            />
          ))}
        </div>
      </div>
    );
  };
}

export const DEFAULT_ARGS = DEFAULT_ARGS_PROP as StoryObj<StoryProps>['args'];

export const DEFAULT_ARG_TYPES: StoryObj<StoryProps>['argTypes'] = {
  exampleFile: {
    name: '[Story]: Show example file',
    options: ['img', 'pdf'],
    control: {
      type: 'radio',
    },
  },
  onClick: { table: { disable: true } },
  onDelete: { table: { disable: true } },
  onDownload: { table: { disable: true } },
  onRetry: { table: { disable: true } },
  file: { table: { disable: true } },
  icon: { table: { disable: true } },
  truncate: { table: { disable: true } },
};

export const DEFAULT_PARAMETERS: StoryObj<StoryProps>['parameters'] = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/design/jtGxAPvFJOMir7V0eQFukN/branch/OSnyUq4zigaHiTkL1egWTB/Snack-UI-Kit-3.0.0?m=auto&node-id=6075%3A208643&t=B12jkbmMhhHAG3cv-1',
  },
};
