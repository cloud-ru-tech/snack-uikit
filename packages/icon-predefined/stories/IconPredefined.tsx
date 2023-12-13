import { Meta, StoryFn, StoryObj } from '@storybook/react';

import * as Icons from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { IconPredefined as IconPredefinedComponent, IconPredefinedProps } from '../src';
import { APPEARANCE, SIZE } from '../src/constants';
import styles from './styles.module.scss';

type StoryProps = Omit<IconPredefinedProps, 'icon'> & {
  icon: string;
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

export const IconPredefined: StoryObj<StoryProps> = Template.bind({});

const iconNames = Object.keys(Icons);

IconPredefined.args = {
  size: SIZE.M,
  appearance: APPEARANCE.Primary,
  decor: true,
  icon: 'PlaceholderSVG',
};
IconPredefined.argTypes = {
  icon: {
    options: iconNames,
    control: {
      type: 'select',
    },
  },
};
IconPredefined.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/1ezTuk3XBJ07dLcx3ZuAqZ/IconPredefined?type=design&mode=design&t=gRHZaE015Lzps23j-0',
  },
};
