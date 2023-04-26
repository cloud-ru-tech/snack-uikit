import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Readme from '../../README.md';
import { Markdown } from './components';

const meta: Meta = {
  title: 'Documentation/Getting Started',
};
export default meta;

const Template: StoryFn = () => <Markdown md={Readme} />;

export const gettingStarted: StoryObj = Template.bind({});
gettingStarted.args = {};
gettingStarted.argTypes = {};
