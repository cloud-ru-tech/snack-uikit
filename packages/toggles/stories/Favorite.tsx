import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Favorite, FavoriteProps } from '../src';
import { FAVORITE_ICON, SIZE } from '../src/constants';

const meta: Meta = {
  title: 'Components/Toggles/Favorite',
  component: Favorite,
};
export default meta;

type StoryProps = FavoriteProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => <Favorite {...args} />;

export const favorite: StoryObj<StoryProps> = Template.bind({});

favorite.args = {
  size: SIZE.M,
  icon: FAVORITE_ICON.Star,
};

favorite.argTypes = {};

favorite.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/QMTZWkA2NyGgSA3ttpruU3/Toggles?type=design&node-id=0-1&t=0JBt65uPqKy9khD5-0',
  },
};
