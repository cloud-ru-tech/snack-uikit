import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-ui/button';
import { SkeletonText } from '@snack-ui/skeleton';

import popoverPrivateReadme from '../../popover-private/README.md';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Droplist, DroplistProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Droplist',
  component: Droplist,
};
export default meta;

type StoryProps = DroplistProps & { storySkeletonWidth: number };

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <div className={styles.story}>
    <Droplist
      {...args}
      content={<SkeletonText width={args.storySkeletonWidth} className={styles.skeleton} loading lines={7} />}
    >
      <ButtonFilled className={styles.button} label='Reference button' data-test-id='button-with-droplist' />
    </Droplist>
  </div>
);

export const droplist: StoryObj<StoryProps> = Template.bind({});

droplist.args = {
  storySkeletonWidth: 330,
  placement: Droplist.placements.BottomStart,
  widthStrategy: Droplist.widthStrategies.Gte,
};
droplist.argTypes = {
  storySkeletonWidth: {
    name: '[Stories]: Skeleton width',
    control: {
      type: 'number',
    },
  },
};

droplist.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, popoverPrivateReadme, componentChangelog],
  },
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GZSkePkicPQbtrYIu1F8GQ/Dropdown?type=design&node-id=0%3A1&t=H7kVBUAPq83jxLpg-1',
  },
};
