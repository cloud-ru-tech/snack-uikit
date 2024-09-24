import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Slider, SliderProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Slider',
  component: Slider,
};
export default meta;

const NOT_LINEAR_MARKS: Record<number, string> = { 1: '512mb', 4: '2gb', 8: '4gb', 16: '8gb' };
const LINEAR_MARKS: Record<number, string> = { 1: '1', 4: '4', 8: '8', 12: '12', 16: '16' };

const STORY_MARKS: Record<string, string> = {
  none: 'none',
  linear: 'linear',
  'not-linear': 'not-linear',
};

const DEFAULT_VALUE = [4, 8];

type StoryProps = SliderProps & {
  storyMarks: 'none' | 'linear' | 'not-linear';
  moveByMarks: boolean;
};

const Template: StoryFn<StoryProps> = ({ storyMarks, moveByMarks, step, ...args }: StoryProps) => {
  const [value, setValue] = useState<number[]>(DEFAULT_VALUE);

  useEffect(() => {
    setValue(DEFAULT_VALUE);
  }, [args.range]);

  const marks = useMemo(() => {
    switch (storyMarks) {
      case 'not-linear': {
        return NOT_LINEAR_MARKS;
      }
      case 'linear': {
        return LINEAR_MARKS;
      }
      case 'none':
      default: {
        return undefined;
      }
    }
  }, [storyMarks]);

  const tipFormatter = useCallback(
    (value: string | number) => {
      switch (storyMarks) {
        case 'not-linear': {
          return NOT_LINEAR_MARKS[Number(value)];
        }
        case 'linear':
        case 'none':
        default: {
          return value;
        }
      }
    },
    [storyMarks],
  );

  return (
    <div className={styles.wrapper}>
      <Slider
        {...args}
        value={args.range ? value : value[0]}
        onChange={newValue => {
          args.range ? setValue(newValue as number[]) : setValue([newValue as number]);
        }}
        step={moveByMarks && storyMarks !== 'none' ? null : step}
        marks={marks}
        tipFormatter={tipFormatter}
      />
    </div>
  );
};

export const slider: StoryObj<StoryProps> = {
  render: Template,

  args: {
    className: 'osThemeSnack',
    min: 1,
    max: 16,
    storyMarks: 'not-linear',
    step: 1,
    moveByMarks: true,
    handleTip: true,
    range: false,
    reverse: false,
  },

  argTypes: {
    storyMarks: {
      name: '[Story]: example marks',
      options: Object.keys(STORY_MARKS),
      mapping: STORY_MARKS,
      control: {
        type: 'radio',
      },
    },
    moveByMarks: {
      name: '[Story]: change value only by marks',
      type: 'boolean',
    },
    step: {
      if: {
        arg: 'moveByMarks',
        eq: false,
      },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      //TODO
      url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
    },
  },
};
