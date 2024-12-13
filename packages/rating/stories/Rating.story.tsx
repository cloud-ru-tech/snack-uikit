import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { APPEARANCE } from '@snack-uikit/tag';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Rating, RatingProps } from '../src';
import { DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT } from '../src/constants';

const meta: Meta = {
  title: 'Components/Rating',
  component: Rating,
};
export default meta;

const Template: StoryFn<RatingProps> = ({ ...args }) => <Rating {...args} />;

export const rating: StoryObj<RatingProps> = {
  render: Template,
  args: {
    allowHalf: false,
    allowClear: false,
    count: DEFAULT_STAR_COUNT,
    defaultValue: DEFAULT_RATING_VALUE,
    value: undefined,
    readonly: false,
    appearance: APPEARANCE.Yellow,
  },
  argTypes: {
    appearance: {
      control: {
        type: 'select',
        options: Object.values(APPEARANCE),
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
