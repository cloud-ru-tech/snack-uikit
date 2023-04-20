import { Meta, StoryFn } from '@storybook/react';

import Readme from '../../README.md';
import { Markdown } from './components';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Documentation/Getting Started',
} as Meta;

const Template: StoryFn = () => <Markdown md={Readme} />;

export const gettingStarted = Template.bind({});
gettingStarted.args = {};
gettingStarted.argTypes = {};
