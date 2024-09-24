import { Meta, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import Contribution from '../../CONTRIBUTING.md';
import { Markdown } from './components';

const meta: Meta<typeof Markdown> = {
  title: 'Documentation/Contribution Guide',
  component: Markdown,
  decorators: [
    Story => {
      const isDark = useDarkMode();

      return <Story args={{ md: Contribution, darkMode: isDark }} />;
    },
  ],
};

export default meta;

export const contributionGuide: StoryObj = {};
