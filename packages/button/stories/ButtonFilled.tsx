import { Meta, Story } from '@storybook/react/types-6-0';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonFilled, ButtonFilledProps, DemoIcon } from '../src';

export default {
  title: 'Not stable/Button/ButtonFilled',
  component: ButtonFilled,
} as Meta;

const Template: Story<ButtonFilledProps & { showIcon: boolean }> = ({ showIcon, ...args }) => {
  const icon = showIcon ? <DemoIcon /> : undefined;
  return <ButtonFilled {...args} icon={icon} />;
};

export const buttonFilled = Template.bind({});
buttonFilled.args = {
  label: 'Button',
  showIcon: false,
  disabled: false,
  loading: false,
  size: ButtonFilled.sizes.SizeS,
  type: ButtonFilled.types.Primary,
};
buttonFilled.argTypes = {
  showIcon: { type: 'boolean' },
  icon: {
    table: {
      disable: true,
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
};
buttonFilled.parameters = {
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
