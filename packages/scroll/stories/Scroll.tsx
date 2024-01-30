import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Scroll, ScrollProps } from '../src';
import { BAR_HIDE_STRATEGY, RESIZE, SIZE } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Scroll',
  component: Scroll,
};

export default meta;

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

export const scroll: StoryObj<StoryProps> = Template.bind({});

scroll.args = {
  contentLines: 15,
  size: SIZE.M,
  barHideStrategy: BAR_HIDE_STRATEGY.Leave,
  resize: RESIZE.None,
  untouchableScrollbars: false,
};

scroll.argTypes = {
  barHideStrategy: {
    options: Object.values(BAR_HIDE_STRATEGY),
    control: {
      type: 'radio',
    },
  },
  resize: {
    options: Object.values(RESIZE),
    control: {
      type: 'radio',
    },
  },
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
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A7&mode=design',
  },
};
