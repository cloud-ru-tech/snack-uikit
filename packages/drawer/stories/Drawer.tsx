import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MouseEventHandler, useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Drawer } from '../src';
import { ARG_TYPES, CONTROLLED_DRAWER_ID, DEFAULT_ARGS, IMAGE_DRAWER_ID, IMAGE_PROP, NESTED_DRAWER } from './constants';
import styles from './styles.module.scss';
import { DrawerStoryProps } from './types';

const meta: Meta = {
  title: 'Components/Drawer',
  component: Drawer,
};
export default meta;

const Template: StoryFn<DrawerStoryProps> = ({ open: openProp, ...args }: DrawerStoryProps) => {
  const [open, setOpen] = useState<string | undefined>(openProp ? CONTROLLED_DRAWER_ID : undefined);

  const toggleDrawer: MouseEventHandler<HTMLButtonElement> = e => {
    const drawerName = e.currentTarget.getAttribute('data-test-id');

    if (drawerName) {
      const drawerId = drawerName.replace('open-', '');

      setOpen(prev => (prev === drawerId ? undefined : drawerId));
    }
  };

  const handleClose = () => setOpen(undefined);

  const [innerOpen, setInnerOpen] = useState(false);

  const toggleInnerDrawer = () => setInnerOpen(prev => !prev);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <ButtonFilled label='Toggle drawer' onClick={toggleDrawer} data-test-id={CONTROLLED_DRAWER_ID} />
      </div>

      <div className={styles.wrapper}>
        Examples:
        <div className={styles.buttons}>
          <ButtonFilled
            label='Toggle drawer with image'
            onClick={toggleDrawer}
            data-test-id={`open-${IMAGE_DRAWER_ID}`}
          />
        </div>
      </div>

      <Drawer
        {...args}
        open={open === CONTROLLED_DRAWER_ID}
        onClose={handleClose}
        approveButton={!args.approveButton ? undefined : { ...args.approveButton, onClick: handleClose }}
        cancelButton={!args.cancelButton ? undefined : { ...args.cancelButton, onClick: handleClose }}
        additionalButton={
          !args.additionalButton ? undefined : { label: NESTED_DRAWER.openButton, onClick: toggleInnerDrawer }
        }
        nestedDrawer={
          <Drawer
            open={innerOpen}
            onClose={toggleInnerDrawer}
            title={NESTED_DRAWER.id}
            content={NESTED_DRAWER.id}
            data-test-id={NESTED_DRAWER.id}
            approveButton={{ label: NESTED_DRAWER.approveButtonLabel, onClick: toggleInnerDrawer }}
          />
        }
      />

      <Drawer
        {...args}
        data-test-id={IMAGE_DRAWER_ID}
        image={IMAGE_PROP}
        open={open === IMAGE_DRAWER_ID}
        onClose={handleClose}
        approveButton={{ ...args.approveButton, onClick: handleClose }}
      />
    </>
  );
};

export const drawer: StoryObj<DrawerStoryProps> = Template.bind({});

drawer.args = DEFAULT_ARGS;

drawer.argTypes = ARG_TYPES;

drawer.parameters = {
  controls: {
    exclude: ['nestedDrawer'],
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
