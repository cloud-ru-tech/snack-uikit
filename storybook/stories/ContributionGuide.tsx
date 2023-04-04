import { Meta, Story } from '@storybook/react/types-6-0';

import Contribution from '../../CONTRIBUTING.md';
import { Markdown } from './components';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Documentation/Contribution Guide',
} as Meta;

const Template: Story = () => <Markdown md={Contribution} />;

export const contributionGuide = Template.bind({});
contributionGuide.args = {};
contributionGuide.argTypes = {};
