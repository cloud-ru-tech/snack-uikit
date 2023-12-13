import { Meta, StoryFn, StoryObj } from '@storybook/react';

import * as Icons from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AlertTop, AlertTopProps } from '../src';
import { APPEARANCE } from '../src/constants';
import styles from './styles.module.scss';

const ICONS = {
  none: undefined,
  ...Object.fromEntries(
    Object.keys(Icons).map(key => {
      const Icon = Icons[key];
      return [key, <Icon key={key} />];
    }),
  ),
};

const REQUIRED_ICONS = { ...ICONS };
delete REQUIRED_ICONS.none;

const meta: Meta = {
  title: 'Components/Alert/AlertTop',
  component: AlertTop,
};
export default meta;

type StoryProps = AlertTopProps & { showCloseButton?: boolean };

const Template: StoryFn<StoryProps> = ({ ...args }: StoryProps) => (
  <div className={styles.wrapper}>
    <AlertTop {...args} onClose={args.showCloseButton ? args.onClose : undefined} />
  </div>
);

export const alertTop: StoryObj<StoryProps> = Template.bind({});

alertTop.args = {
  title: 'Title',
  description: 'Description',
  icon: true,
  link: 'Link text',
  appearance: APPEARANCE.Success,
  buttonText: 'Button Text',
  buttonIcon: <Icons.PlaceholderSVG />,
  onClose: () => {},
  showCloseButton: true,
};

alertTop.argTypes = {
  showCloseButton: {
    name: '[Stories]: showCloseButton',
  },
  onClose: {
    table: {
      disable: true,
    },
  },
  buttonOnClick: {
    table: {
      disable: true,
    },
  },
  buttonIcon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(REQUIRED_ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
};

alertTop.parameters = {
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
