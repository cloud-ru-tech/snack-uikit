import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { DrawerCustom } from '../src';
import { Size } from '../src/constants';
import { ARG_TYPES, DEFAULT_ARGS } from './constants';
import { DrawerCustomStoryProps } from './types';

const meta: Meta = {
  title: 'Components/Drawer',
  component: DrawerCustom,
};
export default meta;

const Template: StoryFn<DrawerCustomStoryProps> = ({
  title,
  titleTooltip,
  subtitle,
  image,
  content,
  sizePredefined,
  sizeCustom,
  ...args
}: DrawerCustomStoryProps) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(val => !val);

  return (
    <>
      <ButtonFilled label='Toggle drawer' onClick={toggleDrawer} />

      <DrawerCustom {...args} size={sizeCustom || sizePredefined} open={open} onClose={toggleDrawer}>
        <DrawerCustom.Header title={title} titleTooltip={titleTooltip} subtitle={subtitle} image={image} />

        <DrawerCustom.Body content={content} />

        <DrawerCustom.Footer
          actions={
            <>
              <ButtonFilled label='custom button' onClick={toggleDrawer} />
            </>
          }
        />
      </DrawerCustom>
    </>
  );
};

export const drawerCustom: StoryObj<DrawerCustomStoryProps> = Template.bind({});

drawerCustom.args = {
  ...DEFAULT_ARGS,
  sizePredefined: Size.S,
  sizeCustom: undefined,
};

drawerCustom.argTypes = {
  ...ARG_TYPES,
  sizePredefined: {
    name: 'size predefined',
    control: {
      type: 'radio',
    },
    options: Object.values(Size),
    defaultValue: Size.S,
    if: {
      arg: 'sizeCustom',
      truthy: false,
    },
  },
  sizeCustom: {
    name: 'size custom (string | number)',
    defaultValue: undefined,
    control: {
      type: 'text',
    },
  },
};

drawerCustom.parameters = {
  controls: {
    exclude: ['size', 'nestedDrawer'],
  },
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/4Oy49etaqzbxq4RpP0xd4L/Drawer?type=design&node-id=602%3A2643&mode=design&t=VDrGS2hKxLdxVSFP-1',
  },
};
