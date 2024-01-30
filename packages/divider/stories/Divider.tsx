import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Divider, DividerProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Divider',
  component: Divider,
};
export default meta;

const Template = ({ ...args }: DividerProps) => (
  <div className={styles.container}>
    <Divider {...args} />
  </div>
);

export const divider: StoryFn<DividerProps> = Template.bind({});

divider.args = {};

divider.argTypes = {};

divider.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=11%3A7167&mode=design',
  },
};
