import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { ButtonOutline } from '@snack-uikit/button';
import { FileSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FileUpload, FileUploadProps } from '../src';
import { UPLOAD_MODE } from '../src/helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Drop Zone/File Upload',
  component: FileUpload,
};
export default meta;

function Template({ ...args }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className={styles.wrapper}>
      <FileUpload {...args} onFilesUpload={setFiles}>
        <ButtonOutline label='Загрузить' icon={<FileSVG />} />
      </FileUpload>

      {files.map(file => (
        <div key={file.name}>
          <p>
            <strong>Name:</strong> {file.name}
          </p>
          <p>
            <strong>Size:</strong> {file.size}
          </p>
          <p>
            <strong>Type:</strong> {file.type}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
}

export const fileUpload: StoryFn<FileUploadProps> = Template.bind({});
fileUpload.args = {
  mode: UPLOAD_MODE.Multiple,
  'data-test-id': 'file-upload',
};

fileUpload.argTypes = {};

fileUpload.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
};
