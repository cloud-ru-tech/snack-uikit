import { Meta, StoryFn, StoryObj } from '@storybook/react';

import * as Icons from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { IconPredefined as IconPredefinedComponent, IconPredefinedProps } from '../src';
import { APPEARANCE, SIZE } from '../src/constants';
import styles from './styles.module.scss';

type Icon = Exclude<keyof typeof Icons, 'Sprite'>;

type StoryProps = Omit<IconPredefinedProps, 'icon'> & {
  icon: Icon;
};

const meta: Meta = {
  title: 'Components/Icon Predefined',
  component: IconPredefinedComponent,
};
export default meta;

const Template: StoryFn<StoryProps> = ({ icon, ...args }) => (
  <div className={styles.wrapper}>
    <IconPredefinedComponent {...args} icon={Icons[icon]} />
  </div>
);

const iconNames = Object.keys(Icons).filter(key => key !== 'Sprite');

export const IconPredefined: StoryObj<StoryProps> = {
  render: Template,

  args: {
    size: SIZE.M,
    appearance: APPEARANCE.Primary,
    decor: true,
    icon: 'PlaceholderSVG',
  },

  argTypes: {
    icon: {
      options: iconNames,
      control: {
        type: 'select',
      },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A20598&mode=design',
    },
  },
};
