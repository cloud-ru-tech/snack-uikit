import { Meta, StoryFn, StoryObj } from '@storybook/react';

import IconsReadme from '../../packages/icons/README.md';
import { Markdown } from './components';

const meta: Meta = {
  title: 'Documentation/Working With Icons',
};
export default meta;

const Template: StoryFn = () => <Markdown md={IconsReadme} />;

export const workingWithIcons: StoryObj = Template.bind({});
workingWithIcons.args = {};
workingWithIcons.argTypes = {};
