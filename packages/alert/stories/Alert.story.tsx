import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { PlaceholderSVG } from '@snack-uikit/icons';

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

type StoryProps = AlertProps & { showCloseButton?: boolean; showActionButtons?: boolean; link: string };

const Template: StoryFn<StoryProps> = ({ link, showCloseButton, showActionButtons, ...args }: StoryProps) => (
  <div className={styles.wrapper}>
    <Alert
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
      actions={showActionButtons ? args.actions : undefined}
    />
  </div>
);

export const alert: StoryObj<StoryProps> = {
  render: Template,

  args: {
    title: 'Title',
    description: 'Title description',
    icon: true,
    link: 'Link text',
    appearance: APPEARANCE.Error,
    showCloseButton: true,
    showActionButtons: true,
    outline: true,
    size: 'm',
    onClose: () => {},
    actions: {
      primary: { text: 'Primary', onClick: () => {}, icon: <PlaceholderSVG />, loading: false },
      secondary: { text: 'Secondary', onClick: () => {}, icon: <PlaceholderSVG />, loading: true },
    },
  },

  argTypes: {
    showCloseButton: {
      name: '[Stories]: showCloseButton',
    },
    showActionButtons: {
      name: '[Stories]: showActionButtons',
    },
    link: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    onClose: {
      table: {
        disable: true,
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A183757&mode=design',
    },
  },
};
