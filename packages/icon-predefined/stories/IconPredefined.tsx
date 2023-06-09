import { Meta, StoryFn, StoryObj } from '@storybook/react';

import * as Icons from '@snack-ui/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { IconPredefined as IconPredefinedComponent, IconPredefinedProps } from '../src/components/IconPredefined';
import styles from './styles.module.scss';

type StoryProps = Omit<IconPredefinedProps, 'icon'> & {
  icon: string;
};

// используются только S иконки
const isSSizeIcon = ([name]: [name: string, value: any]) => name.endsWith('SSVG');

const icons = Object.fromEntries(Object.entries(Icons).filter(isSSizeIcon));

const meta: Meta = {
  title: 'Components/Icon Predefined',
  component: IconPredefinedComponent,
};
export default meta;

const Template: StoryFn<StoryProps> = ({ icon, ...args }) => (
  <div className={styles.wrapper}>
    <IconPredefinedComponent {...args} icon={icons[icon]} />
  </div>
);

export const IconPredefined: StoryObj<StoryProps> = Template.bind({});

const iconNames = Object.keys(icons);

IconPredefined.args = {
  size: IconPredefinedComponent.sizes.M,
  appearance: IconPredefinedComponent.appearances.Primary,
  decor: true,
  icon: iconNames[0],
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
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/1ezTuk3XBJ07dLcx3ZuAqZ/IconPredefined?type=design&mode=design&t=gRHZaE015Lzps23j-0',
  },
};
