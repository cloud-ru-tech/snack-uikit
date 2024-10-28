import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import IconsReadme from '../../packages/icons/README.md';
import { Markdown } from './components';

const meta: Meta = {
  title: 'Documentation/Working With Icons',
};
export default meta;

const Template: StoryFn = () => <Markdown md={IconsReadme} darkMode={useDarkMode()} />;

export const workingWithIcons: StoryObj = {
  render: Template,
};
