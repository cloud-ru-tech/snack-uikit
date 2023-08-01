import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-ui/button';
import { SkeletonText } from '@snack-ui/skeleton';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Dropdown, DropdownProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Droplist/Dropdown',
  component: Dropdown,
};
export default meta;

type StoryProps = DropdownProps & { storySkeletonWidth: number };

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div className={styles.pageWrapper}>
    <div className={styles.wrapper}>
      <Dropdown
        {...args}
        content={<SkeletonText width={args.storySkeletonWidth} className={styles.skeleton} loading lines={7} />}
      >
        <ButtonFilled className={styles.button} label='Reference button' data-test-id='button-with-droplist' />
      </Dropdown>
    </div>
  </div>
);

export const dropdown: StoryObj<StoryProps> = Template.bind({});

dropdown.args = {
  storySkeletonWidth: 330,
  placement: Dropdown.placements.BottomStart,
  widthStrategy: Dropdown.widthStrategies.Gte,
};
dropdown.argTypes = {
  storySkeletonWidth: {
    name: '[Stories]: Skeleton width',
    control: {
      type: 'number',
    },
  },
};

dropdown.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GZSkePkicPQbtrYIu1F8GQ/Dropdown?type=design&node-id=0%3A1&t=H7kVBUAPq83jxLpg-1',
  },
};
