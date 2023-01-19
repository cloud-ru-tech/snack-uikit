import { Meta, Story } from '@storybook/react/types-6-0';
import { AriaAttributes } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonFilled, ButtonFilledProps } from '../src';

export default {
  title: 'Not stable/Button/ButtonFilled',
  component: ButtonFilled,
} as Meta;

const Icon = (props: AriaAttributes) => (
  <div style={{ padding: 4, boxSizing: 'border-box', width: 24, height: 24 }} {...props}>
    <svg
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
      data-test-id='icon-favourite-service'
      id='FavouriteServiceSVG'
      style={{ width: 16, height: 16 }}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M.29 7.362a.628.628 0 0 1 .575-.415l5.59-.23a.63.63 0 0 0 .564-.387l1.958-4.938a.633.633 0 0 1 .59-.388L10.42 1a.633.633 0 0 1 .596.388l1.96 4.942a.631.631 0 0 0 .565.387l5.584.23c.263.011.491.174.574.41l.268.764a.577.577 0 0 1-.207.655l-4.378 3.284a.577.577 0 0 0-.216.627l1.493 5.08a.58.58 0 0 1-.235.64l-.688.477a.664.664 0 0 1-.724.017l-4.666-2.912a.665.665 0 0 0-.698 0l-4.661 2.91a.665.665 0 0 1-.72-.014l-.693-.47a.58.58 0 0 1-.24-.644l1.494-5.084a.578.578 0 0 0-.216-.627L.24 8.778A.577.577 0 0 1 .03 8.13l.26-.768Z'
        fill='inherit'
      ></path>
    </svg>
  </div>
);

const Template: Story<ButtonFilledProps & { showIcon: boolean }> = ({ showIcon, ...args }) => {
  const icon = showIcon ? <Icon /> : undefined;
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
