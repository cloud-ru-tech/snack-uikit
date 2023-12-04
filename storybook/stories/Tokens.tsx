import { Meta, StoryFn, StoryObj } from '@storybook/react';

import TokensChangelog from '@snack-uikit/figma-tokens/CHANGELOG.md';
import TokensReadme from '@snack-uikit/figma-tokens/README.md';

import { BasePalette, Markdown, SystemPaletteStory } from './components';

const meta: Meta = {
  title: 'Documentation/Tokens',
};
export default meta;
const Template: StoryFn = ({ md }) => <Markdown md={md} />;

export const howToUse: StoryObj = Template.bind({});
howToUse.args = {
  md: TokensReadme,
};
howToUse.argTypes = {};

export const changelog: StoryObj = Template.bind({});
changelog.args = {
  md: TokensChangelog,
};
changelog.argTypes = {};

const BasePaletteTemplate: StoryFn = () => <BasePalette />;
export const basePalette: StoryObj = BasePaletteTemplate.bind({});
basePalette.args = {};
basePalette.argTypes = {};

const SystemPaletteTemplate: StoryFn = () => <SystemPaletteStory />;
export const systemPalette: StoryObj = SystemPaletteTemplate.bind({});
systemPalette.args = {};
systemPalette.argTypes = {};
