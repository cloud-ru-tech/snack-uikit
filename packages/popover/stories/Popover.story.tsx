import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-uikit/button';
import { Link } from '@snack-uikit/link';

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
    <div data-test-id='activity-removal' role='button' tabIndex={0} className={styles.item} />
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
  </>
);

export const popover: StoryObj<StoryProps> = {
  render: Template,

  args: {
    trigger: 'click',
    placement: 'top',
  },

  argTypes: { tip: { type: 'string' }, outsideClick: { type: 'boolean' } },

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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A10&mode=design',
    },
    a11y: {
      element: `.${styles.story}`,
    },
  },
};
