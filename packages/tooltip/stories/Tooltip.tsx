import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-ui/button';
import { Link } from '@snack-ui/link';

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
              do not press this button, please
              <br /> <Link href='#' text='read why' />
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

export const tooltip: StoryObj<StoryProps> = Template.bind({});
tooltip.args = {
  trigger: Tooltip.triggers.Hover,
  placement: Tooltip.placements.Top,
};
tooltip.argTypes = { tip: { type: 'string' } };

tooltip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/PsHlbVIIO6j4VTPvr1uPJH/Tooltip',
  },
};
