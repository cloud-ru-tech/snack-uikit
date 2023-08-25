import { useArgs } from '@storybook/client-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ButtonFilled, ButtonTonal } from '@snack-ui/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ModalCustom, ModalCustomProps } from '../src';
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
  const [storyArgs, setStoryArgs] = useArgs<StoryProps>();

  useEffect(() => {
    if (storyArgs.showImage) {
      setStoryArgs({ showIcon: false });
    }
  }, [setStoryArgs, storyArgs.showImage]);

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
              <ButtonTonal label='Cancel button' size={ButtonTonal.sizes.S} />

              <ButtonFilled label='Custom button' size={ButtonFilled.sizes.S} data-test-id='approve-button' />
            </>
          }
        />
      </ModalCustom>
    </>
  );
};

export const modalCustom: StoryObj<StoryProps> = Template.bind({});

modalCustom.args = {
  ...DEFAULT_ARGS,
  disclaimer: 'Custom disclaimer text',
  headerAlign: ModalCustom.Header.aligns.Default,
  bodyAlign: ModalCustom.Body.aligns.Default,
  footerAlign: ModalCustom.Footer.aligns.Default,
};

modalCustom.argTypes = {
  ...ARG_TYPES,
  disclaimer: {
    type: 'string',
  },
  headerAlign: {
    defaultValue: ModalCustom.Header.aligns.Default,
    options: Object.keys(ModalCustom.Header.aligns),
    mapping: ModalCustom.Header.aligns,
    control: {
      type: 'select',
    },
  },
  bodyAlign: {
    defaultValue: ModalCustom.Body.aligns.Default,
    options: Object.keys(ModalCustom.Body.aligns),
    mapping: ModalCustom.Body.aligns,
    control: {
      type: 'select',
    },
  },
  footerAlign: {
    defaultValue: ModalCustom.Footer.aligns.Default,
    options: Object.keys(ModalCustom.Footer.aligns),
    mapping: ModalCustom.Footer.aligns,
    control: {
      type: 'select',
    },
  },
};

modalCustom.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/rpkpVhfaeFNajYXlFNkllN/Modal?type=design&node-id=0%3A1&mode=design&t=KLRZX3TvkkGUhKqw-1',
  },
  controls: {
    exclude: ['align'],
  },
};
