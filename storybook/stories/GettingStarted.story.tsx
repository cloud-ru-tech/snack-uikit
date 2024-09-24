import { Meta, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import Readme from '../../README.md';
import CloudRuFullLogoDark from '../assets/CloudRuFullLogoDark.svg';
import { Markdown } from './components';

const PATTERN_TO_REPLACE = new RegExp(/!\[Cloud]\((?<imagePath>.+?)\)/);

const currentImagePath = PATTERN_TO_REPLACE.exec(Readme)?.groups?.imagePath;

const meta: Meta<typeof Markdown> = {
  title: 'Documentation/Getting Started',
  component: Markdown,
  decorators: [
    Story => {
      const isDark = useDarkMode();

      const readme =
        currentImagePath && isDark ? Readme.replace(currentImagePath, String(CloudRuFullLogoDark)) : Readme;

      return <Story args={{ md: readme, darkMode: isDark }} />;
    },
  ],
};
export default meta;

export const gettingStarted: StoryObj<typeof Markdown> = {};
