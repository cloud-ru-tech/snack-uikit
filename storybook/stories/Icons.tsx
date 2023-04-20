import { Meta, StoryFn } from '@storybook/react';

import IconsReadme from '../../packages/icons/README.md';
import { Markdown } from './components';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Documentation/Working With Icons',
} as Meta;

const Template: StoryFn = () => <Markdown md={IconsReadme} />;

export const workingWithIcons = Template.bind({});
workingWithIcons.args = {};
workingWithIcons.argTypes = {};
