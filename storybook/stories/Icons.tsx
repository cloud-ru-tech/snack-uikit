import { Meta, Story } from '@storybook/react/types-6-0';

import IconsReadme from '../../packages/icons/README.md';
import { Markdown } from './components';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Documentation/Working With Icons',
} as Meta;

const Template: Story = () => <Markdown md={IconsReadme} />;

export const workingWithIcons = Template.bind({});
workingWithIcons.args = {};
workingWithIcons.argTypes = {};
