import { Meta, StoryFn } from '@storybook/react';

import { Scroll } from '@snack-ui/scroll';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TruncateString, TruncateStringProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Truncate String',
  component: TruncateString,
};
export default meta;

function Template({ ...args }: TruncateStringProps) {
  return (
    <Scroll className={styles.wrapper} resize={Scroll.resizes.Horizontal}>
      <TruncateString {...args} />
    </Scroll>
  );
}

export const truncateString: StoryFn<TruncateStringProps> = Template.bind({});

truncateString.args = {
  maxLines: 1,
  text: 'какой-то длинный текст который обрезается на самом интересном',
  hideTooltip: false,
  variant: TruncateString.variants.End,
};

truncateString.argTypes = {};

truncateString.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
};
