import { Meta, Story } from '@storybook/react/types-6-0';

import Readme from '../../README.md';
import { Markdown } from './components';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Documentation/Getting Started',
} as Meta;

const Template: Story = () => <Markdown md={Readme} />;

export const gettingStarted = Template.bind({});
gettingStarted.args = {};
gettingStarted.argTypes = {};
