import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Button, ButtonProps } from '../src';

export default {
  title: 'Not stable/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = ({ ...args }) => <Button {...args} />;

export const button = Template.bind({});
button.args = {};
button.argTypes = {};
button.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    //TODO
    url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
  },
};
