import { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldDecorator, FieldDecoratorProps } from '../src/components';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Decorator',
  component: FieldDecorator,
};
export default meta;

type StoryProps = FieldDecoratorProps;

const Template = (args: StoryProps) => (
  <div className={styles.wrapper} data-size={args.size}>
    <FieldDecorator {...args}>
      <div className={styles.decoratorStory}>
        <Typography.SansBodyM>Custom content - ReactNode</Typography.SansBodyM>
      </div>
    </FieldDecorator>
  </div>
);

export const fieldDecorator: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label text',
    labelTooltip: 'Tooltip description',
    required: false,
    caption: 'Caption',
    hint: 'Hint text',
    size: 's',
    readonly: false,
    validationState: 'default',
    disabled: false,
  },

  argTypes: {
    validationState: COMMON_ARG_TYPES.validationState,
    labelTooltip: COMMON_ARG_TYPES.labelTooltip,
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1',
    },
  },
};
