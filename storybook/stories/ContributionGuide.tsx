import { Meta, StoryFn, StoryObj } from '@storybook/react';

import Contribution from '../../CONTRIBUTING.md';
import { Markdown } from './components';

const meta: Meta = {
  title: 'Documentation/Contribution Guide',
};
export default meta;

const Template: StoryFn = () => <Markdown md={Contribution} />;

export const contributionGuide: StoryObj = Template.bind({});
contributionGuide.args = {};
contributionGuide.argTypes = {};
