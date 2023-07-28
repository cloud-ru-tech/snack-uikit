import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-ui/button';
import { Link } from '@snack-ui/link';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Popover, PopoverProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Popover',
  component: Popover,
};
export default meta;

type StoryProps = PopoverProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <>
    <div className={styles.story}>
      <Popover
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
        <ButtonFilled label='Reference button' data-test-id='button-with-popover' />
      </Popover>
    </div>
    <div data-test-id='activity-removal' role='button' tabIndex={0} className={styles.item} />
  </>
);

export const popover: StoryObj<StoryProps> = Template.bind({});
popover.args = {
  trigger: Popover.triggers.Click,
  placement: Popover.placements.Top,
};
popover.argTypes = { tip: { type: 'string' }, outsideClick: { type: 'boolean' } };

popover.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/hu0fp2FpkK1tVf8YSwCqmT/Popover',
  },
  a11y: {
    element: `.${styles.story}`,
  },
};
