import { Meta, StoryFn } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Scroll, ScrollProps } from '../src';
import { BarHideStrategy, Resize, Size } from '../src/constants';
import styles from './styles.module.scss';

export default {
  title: 'Components/Scroll',
  component: Scroll,
} as Meta;

type StoryProps = ScrollProps & {
  contentLines: number;
};

const Template: StoryFn<StoryProps> = ({ contentLines, ...args }) => (
  <Scroll className={styles.box} {...args}>
    <div data-test-id='content'>
      {Array(contentLines)
        .fill(true)
        .map((_, index) => (
          <h2 key={index} className={styles.line}>
            {index}. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa repellendus animi corrupti neque!
          </h2>
        ))}
    </div>
  </Scroll>
);

export const scroll = Template.bind({});

scroll.args = {
  contentLines: 15,
  size: Size.M,
  barHideStrategy: BarHideStrategy.Leave,
  resize: Resize.None,
};

scroll.argTypes = {
  contentLines: {
    name: '[Stories]: Content text lines count ',
    control: {
      type: 'number',
    },
  },
};

scroll.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/n1awo6IUteQtFGr41jutPX/Scroll',
  },
};
