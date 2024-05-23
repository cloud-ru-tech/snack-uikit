import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Card } from '@snack-uikit/card';
import { FieldStepper } from '@snack-uikit/fields';

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
  storyCards: number;
};

const Template: StoryFn<StoryProps> = ({ storyCards, ...args }) => {
  const [counter, setCounter] = useState<number>(storyCards);

  useEffect(() => {
    setCounter(storyCards);
  }, [storyCards]);

  return (
    <>
      <div className={styles.fieldWrapper}>
        <FieldStepper value={counter} onChange={setCounter} min={1} max={100} label='Content cards count ' />
      </div>
      <Scroll className={styles.box} {...args}>
        <div data-test-id='content' data-autoscroll={args.autoscrollTo || undefined} className={styles.wrapper}>
          {Array.from({ length: counter })
            .fill(true)
            .map((_, index) => (
              <Card key={index} header={<Card.Header title={(index + 1).toString()} />} outline>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa repellendus animi corrupti neque!
              </Card>
            ))}
        </div>
      </Scroll>
    </>
  );
};

export const scroll: StoryObj<StoryProps> = Template.bind({});

scroll.args = {
  size: SIZE.M,
  barHideStrategy: BAR_HIDE_STRATEGY.Leave,
  resize: RESIZE.None,
  untouchableScrollbars: false,
  storyCards: 5,
};

scroll.argTypes = {
  storyCards: {
    name: '[Stories]: demo story cards count',
  },
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
