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

export const favorite: StoryObj<StoryProps> = {
  render: Template,

  args: {
    size: SIZE.M,
    icon: FAVORITE_ICON.Star,
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A4&mode=design',
    },
  },
};
