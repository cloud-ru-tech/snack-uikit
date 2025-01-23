import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonCombo, ButtonComboProps } from '../src';
import { BUTTON_SIZES, DROPLIST_OPTIONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Button Combo',
  component: ButtonCombo,
};
export default meta;

type StoryProps = ButtonComboProps & { appearance: undefined };

const Template: StoryFn<StoryProps> = args => (
  <>
    <div className={styles.wrapper}>
      <ButtonCombo {...args} />
    </div>
  </>
);

export const buttonCombo: StoryObj<StoryProps> = {
  render: Template,

  args: {
    defaultLabel: 'create',
    disabled: false,
    loading: false,
    size: 's',
    fullWidth: false,
    items: DROPLIST_OPTIONS,
  },

  argTypes: {
    size: {
      options: BUTTON_SIZES,
      control: {
        type: 'radio',
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
      url: 'https://www.figma.com/design/uHvHVCvGQ98sGxbcZaNAOa/PDS-51-(Button-Combo)?node-id=16373-9667&mode=design',
    },
  },
};
