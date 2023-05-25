import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Favorite, FavoriteProps } from '../src';
import { FavoriteIcon, LabelPosition, Size, Width } from '../src/constants';

const meta: Meta = {
  title: 'Components/Toggles/Favorite',
  component: Favorite,
};
export default meta;

type StoryProps = FavoriteProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <Favorite {...args} />;

export const favorite: StoryObj<StoryProps> = Template.bind({});

favorite.args = {
  label: 'Text body',
  labelPosition: LabelPosition.Right,
  width: Width.Auto,
  size: Size.M,
  icon: FavoriteIcon.Star,
};

favorite.argTypes = {};

favorite.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/QMTZWkA2NyGgSA3ttpruU3/Toggles?type=design&node-id=0-1&t=0JBt65uPqKy9khD5-0',
  },
};
