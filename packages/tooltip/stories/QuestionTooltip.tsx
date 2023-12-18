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

export const questionTooltip: StoryObj<StoryProps> = Template.bind({});

questionTooltip.args = {
  size: 's',
  trigger: 'click',
  placement: 'top',
};

questionTooltip.argTypes = {
  tip: { type: 'string' },
  open: { table: { disable: true } },
  onOpenChange: { table: { disable: true } },
};

questionTooltip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/PsHlbVIIO6j4VTPvr1uPJH/Tooltip',
  },
  a11y: {
    element: `.${styles.story}`,
  },
};
