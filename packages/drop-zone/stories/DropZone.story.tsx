import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DropZone, DropZoneProps } from '../src';
import { UPLOAD_MODE } from '../src/helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Drop Zone/Drop Zone',
  component: DropZone,
};
export default meta;

type StoryProps = DropZoneProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className={styles.wrapper}>
      <DropZone {...args} onFilesUpload={setFiles} />
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
};

export const dropZone: StoryObj<StoryProps> = {
  render: Template,

  args: {
    title: 'Title',
    description: 'Description',
    disabled: false,
    mode: UPLOAD_MODE.Multiple,
  },

  argTypes: {
    description: { type: 'string' },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    badges: [BADGE.STABLE],
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A146267&mode=design',
    },
  },
};
