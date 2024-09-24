import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-uikit/button';
import { PlaceholderSVG } from '@snack-uikit/icons';
import { Tooltip } from '@snack-uikit/tooltip';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { HotSpot, HotSpotProps } from '../src';

const meta: Meta = {
  title: 'Components/HotSpot',
  component: HotSpot,
};
export default meta;

type StoryProps = HotSpotProps & {
  showDotRender: boolean;
};

const Template: StoryFn<StoryProps> = ({ showDotRender, ...args }) => (
  <HotSpot
    {...args}
    dotRender={
      showDotRender
        ? dot => (
            <Tooltip placement='bottom' tip={'HotSpot dotRender'} trigger='click'>
              {dot}
            </Tooltip>
          )
        : undefined
    }
  >
    <ButtonFilled appearance='neutral' label='Send Message' icon={<PlaceholderSVG />} />
  </HotSpot>
);

export const hotSpot: StoryObj<StoryProps> = {
  render: Template,

  args: {
    appearance: 'primary',
    placement: 'right-top',
    pulse: true,
    offsetX: 8,
    offsetY: -8,
    showDotRender: true,
    enabled: true,
    duration: '2s',
  },

  argTypes: {
    offsetX: {
      type: 'number',
    },
    offsetY: {
      type: 'number',
    },
    duration: {
      if: {
        eq: true,
        arg: 'pulse',
      },
    },
    dotRender: { table: { disable: true } },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      //TODO
      url: 'https://pocka.github.io/storybook-addon-designs/?path=/story/docs-quick-start--page',
    },
  },
};
