import { Meta, StoryFn, StoryObj } from '@storybook/react';

import TokensChangelog from '@sbercloud/figma-tokens/CHANGELOG.md';
import TokensReadme from '@sbercloud/figma-tokens/README.md';

import { Markdown } from './components';

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
