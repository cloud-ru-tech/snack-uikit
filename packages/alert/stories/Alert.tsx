import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Alert, AlertProps } from '../src';
import { APPEARANCE } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Alert/Alert',
  component: Alert,
};
export default meta;

type StoryProps = AlertProps & { showCloseButton?: boolean; showActionButtons?: boolean };

const Template: StoryFn<StoryProps> = ({ ...args }: StoryProps) => (
  <div className={styles.wrapper}>
    <Alert
      {...args}
      onClose={args.showCloseButton ? args.onClose : undefined}
      action={args.showActionButtons ? args.action : undefined}
    />
  </div>
);

export const alert: StoryObj<StoryProps> = Template.bind({});

alert.args = {
  title: 'Title',
  description: 'Title description',
  icon: true,
  link: 'Link text',
  appearance: APPEARANCE.Error,
  showCloseButton: true,
  showActionButtons: true,
  onClose: () => {},
  action: [
    { label: 'Primary', onClick: () => {} },
    { label: 'Secondary', onClick: () => {} },
  ],
};

alert.argTypes = {
  showCloseButton: {
    name: '[Stories]: showCloseButton',
  },
  showActionButtons: {
    name: '[Stories]: showActionButtons',
  },
  onClose: {
    table: {
      disable: true,
    },
  },
};

alert.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/8mbpi9hYDOy2X9FDpPhDQc/branch/oimvvgUx1eicoGjmfyjybX/Alert?type=design&node-id=0-1&mode=design&t=Wwhe2MGPdFgkS7vM-0',
  },
};
