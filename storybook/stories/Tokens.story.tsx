import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import TokensChangelog from '@snack-uikit/figma-tokens/CHANGELOG.md';
import TokensReadme from '@snack-uikit/figma-tokens/README.md';

import { BasePalette, Markdown, SystemPaletteStory } from './components';

const meta: Meta = {
  title: 'Documentation/Tokens',
};
export default meta;

const Template: StoryFn = ({ md }) => <Markdown md={md} darkMode={useDarkMode()} />;

export const howToUse: StoryObj = {
  render: Template,
  args: {
    md: TokensReadme,
  },
};

export const changelog: StoryObj = {
  render: Template,
  args: {
    md: TokensChangelog,
  },
};

const BasePaletteTemplate: StoryFn = () => <BasePalette />;

export const basePalette: StoryObj = {
  render: BasePaletteTemplate,
};

const SystemPaletteTemplate: StoryFn = () => <SystemPaletteStory />;

export const systemPalette: StoryObj = {
  render: SystemPaletteTemplate,
};
