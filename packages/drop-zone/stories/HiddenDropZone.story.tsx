import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { BADGE } from '../../../storybook/constants';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HiddenDropZone, HiddenDropZoneProps } from '../src';
import { UPLOAD_MODE } from '../src/helperComponents';
import classNames from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Drop Zone/Hidden Drop Zone',
  component: HiddenDropZone,
};
export default meta;

type StoryProps = HiddenDropZoneProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div>
      <HiddenDropZone {...args} onFilesUpload={setFiles}>
        <div id='form' className={classNames.card}>
          <form className={classNames.form}>
            <label htmlFor='firstName'>Имя</label>
            <input id='firstName' />
            <label htmlFor='lastName'>Фамилия</label>
            <input id='lastName' />
          </form>
        </div>
      </HiddenDropZone>

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

export const hiddenDropZone: StoryObj<StoryProps> = {
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
