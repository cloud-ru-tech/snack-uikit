import { Meta, StoryFn } from '@storybook/react';

import TokensChangelog from '@sbercloud/figma-tokens/CHANGELOG.md';
import TokensReadme from '@sbercloud/figma-tokens/README.md';

import { Markdown } from './components';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Documentation/Tokens',
} as Meta;

const Template: StoryFn = ({ md }) => <Markdown md={md} />;

export const howToUse = Template.bind({});
howToUse.args = {
  md: TokensReadme,
};
howToUse.argTypes = {};

export const changelog = Template.bind({});
changelog.args = {
  md: TokensChangelog,
};
changelog.argTypes = {};
