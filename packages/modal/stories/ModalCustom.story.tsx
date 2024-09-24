import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ButtonFilled, ButtonTonal } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ModalCustom, ModalCustomProps } from '../src';
import { ALIGN, CONTENT_ALIGN } from '../src/constants';
import { ARG_TYPES, DEFAULT_ARGS } from './constants';
import { ExtendedStoryProps } from './types';
import { getStoryPicture } from './utils';

const meta: Meta = {
  title: 'Components/Modal',
  component: ModalCustom,
};
export default meta;

type ModalProps = ModalCustomProps &
  Omit<ModalCustom.HeaderProps, 'align'> &
  Omit<ModalCustom.BodyProps, 'align'> &
  Omit<ModalCustom.FooterProps, 'align'> & {
    headerAlign?: ModalCustom.HeaderProps['align'];
    bodyAlign?: ModalCustom.BodyProps['align'];
    footerAlign?: ModalCustom.FooterProps['align'];
  };

type StoryProps = ExtendedStoryProps<ModalProps>;

const Template: StoryFn<StoryProps> = ({
  title,
  titleTooltip,
  subtitle,
  headerAlign,
  picture,
  content,
  bodyAlign,
  disclaimer,
  footerAlign,
  showIcon,
  showImage,
  ...args
}: StoryProps) => {
  const [isOpen, setOpen] = useState(true);

  const toggleModal = () => setOpen(prev => !prev);

  return (
    <>
      <ButtonFilled label='Toggle modal' onClick={toggleModal} data-test-id='toggle-modal' />

      <ModalCustom {...args} open={isOpen} onClose={toggleModal} data-test-id='modal'>
        <ModalCustom.Header
          align={headerAlign}
          title={title}
          titleTooltip={titleTooltip}
          subtitle={subtitle}
          picture={getStoryPicture({ picture, showImage, showIcon, icon: args.icon })}
        />

        <ModalCustom.Body content={content} align={bodyAlign} />

        <ModalCustom.Footer
          align={footerAlign}
          disclaimer={disclaimer}
          actions={
            <>
              <ButtonFilled label='Custom button' size='s' data-test-id='approve-button' />
              <ButtonTonal label='Cancel button' size='s' />
            </>
          }
        />
      </ModalCustom>
    </>
  );
};

export const modalCustom: StoryObj<StoryProps> = {
  render: Template,

  decorators: [
    Story => {
      const [storyArgs, setStoryArgs] = useArgs<StoryProps>();

      useEffect(() => {
        if (storyArgs.showImage) {
          setStoryArgs({ showIcon: false });
        }
      }, [setStoryArgs, storyArgs.showImage]);

      return <Story {...storyArgs} />;
    },
  ],

  args: {
    ...DEFAULT_ARGS,
    disclaimer: 'Custom disclaimer text',
    headerAlign: 'default',
    bodyAlign: 'default',
    footerAlign: 'default',
  },

  argTypes: {
    ...ARG_TYPES,
    disclaimer: {
      type: 'string',
    },
    headerAlign: {
      defaultValue: 'default',
      options: Object.keys(CONTENT_ALIGN),
      mapping: CONTENT_ALIGN,
      control: {
        type: 'select',
      },
    },
    bodyAlign: {
      defaultValue: 'default',
      options: Object.keys(CONTENT_ALIGN),
      mapping: CONTENT_ALIGN,
      control: {
        type: 'select',
      },
    },
    footerAlign: {
      defaultValue: 'default',
      options: Object.keys(ALIGN),
      mapping: ALIGN,
      control: {
        type: 'select',
      },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A205426&mode=design',
    },
    controls: {
      exclude: ['align'],
    },
  },
};
