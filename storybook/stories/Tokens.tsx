import { Meta, Story } from '@storybook/react/types-6-0';

import TokensChangelog from '@sbercloud/figma-tokens/CHANGELOG.md';
import TokensReadme from '@sbercloud/figma-tokens/README.md';

import { Markdown } from './components';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Documentation/Tokens',
} as Meta;

const Template: Story = ({ md }) => <Markdown md={md} />;

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
