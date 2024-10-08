import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-uikit/button';
import { Link } from '@snack-uikit/link';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tooltip, TooltipProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
};
export default meta;

type StoryProps = TooltipProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <>
    <div className={styles.story}>
      <Tooltip
        {...args}
        tip={
          args.tip || (
            <div>
              do not press this button, please do not press this button, please do not press this button, please do not
              press this button, please do not press this button, please
              <br />
              <Link href='#' text='read why' textMode='accent' appearance='invert-neutral' />
            </div>
          )
        }
      >
        <ButtonFilled label='Reference button' data-test-id='button-with-tooltip' />
      </Tooltip>
    </div>
    <div data-test-id='activity-removal' role='button' tabIndex={0} className={styles.item} />
  </>
);

export const tooltip: StoryObj<StoryProps> = {
  render: Template,

  args: {
    trigger: 'hover',
    placement: 'top',
    disableMaxWidth: false,
  },

  argTypes: { tip: { type: 'string' } },

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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=7%3A3034&mode=design',
    },
    a11y: {
      element: `.${styles.story}`,
    },
  },
};
