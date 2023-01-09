import { Meta, Story } from '@storybook/react/types-6-0';

import Readme from '../../../README.md';
import { Markdown } from '../markdown/Markdown';

export default {
  title: 'Welcome/Welcome',
} as Meta;

const Template: Story = () => <Markdown md={Readme} />;

export const welcome = Template.bind({});
welcome.args = {};
welcome.argTypes = {};
