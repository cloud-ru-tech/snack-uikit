import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Link } from '@snack-uikit/link';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { QuestionTooltip, QuestionTooltipProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: QuestionTooltip,
};
export default meta;

type StoryProps = QuestionTooltipProps;

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div className={styles.story}>
    <QuestionTooltip
      {...args}
      data-test-id={'tooltip-test'}
      triggerSupportProps={{
        'data-appearance': 'blue',
        'data-test-id': 'trigger-test',
      }}
      tip={
        args.tip || (
          <div>
            do not press this button, please
            <br />
            <Link href='#' text='read why' textMode='accent' appearance='invert-neutral' />
          </div>
        )
      }
    />
  </div>
);

export const questionTooltip: StoryObj<StoryProps> = {
  render: Template,

  args: {
    size: 's',
    trigger: 'click',
    placement: 'top',
  },

  argTypes: {
    tip: { type: 'string' },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },

  parameters: {
    readme: {
      sidebar: [
        `Latest version: ${componentPackage.version}`,
        componentReadme,
        popoverPrivateReadme,
        componentChangelog,
      ],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=7%3A3108&mode=design',
    },
    a11y: {
      element: `.${styles.story}`,
    },
  },
};
