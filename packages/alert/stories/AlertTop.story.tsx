import { Meta, StoryFn, StoryObj } from '@storybook/react';

import * as Icons from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AlertTop, AlertTopProps } from '../src';
import { APPEARANCE } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Alert/AlertTop',
  component: AlertTop,
};
export default meta;

type StoryProps = AlertTopProps & { showCloseButton?: boolean; link: string };

const Template: StoryFn<StoryProps> = ({ link, showCloseButton, ...args }: StoryProps) => (
  <div className={styles.wrapper}>
    <AlertTop
      {...args}
      link={
        link
          ? {
              text: link,
              href: '#',
              onClick: e => {
                e.preventDefault();
              },
            }
          : undefined
      }
      onClose={showCloseButton ? args.onClose : undefined}
    />
  </div>
);

export const alertTop: StoryObj<StoryProps> = {
  render: Template,

  args: {
    title: 'Title',
    description: 'Description',
    icon: true,
    link: 'Link text',
    appearance: APPEARANCE.Success,
    action: {
      text: 'Button Text',
      icon: <Icons.PlaceholderSVG />,
      onClick: () => {},
    },
    onClose: () => {},
    showCloseButton: true,
  },

  argTypes: {
    showCloseButton: {
      name: '[Stories]: showCloseButton',
    },
    onClose: {
      table: {
        disable: true,
      },
    },
    description: {
      type: 'string',
    },
    link: {
      type: 'string',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A182904&mode=design',
    },
  },
};
