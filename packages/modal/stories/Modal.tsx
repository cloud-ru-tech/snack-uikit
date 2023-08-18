import { useArgs } from '@storybook/client-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MouseEventHandler, useEffect, useState } from 'react';

import { ButtonFilled } from '@snack-ui/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Modal, ModalProps } from '../src';
import { Size } from '../src/constants';
import { ARG_TYPES, CONTROLLED_MODAL_ID, DEFAULT_ARGS, MODAL_IDS, PICTURE_ARGS } from './constants';
import styles from './styles.module.scss';
import { ExtendedStoryProps } from './types';
import { getStoryPicture } from './utils';

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
};
export default meta;

type StoryProps = ExtendedStoryProps<ModalProps>;

const Template: StoryFn<StoryProps> = ({ showIcon, showImage, align, alignM, ...args }: StoryProps) => {
  const [storyArgs, setStoryArgs] = useArgs<StoryProps>();

  useEffect(() => {
    if (storyArgs.size !== Modal.sizes.S || storyArgs.showImage) {
      setStoryArgs({ showIcon: false });
    }
  }, [setStoryArgs, storyArgs.showImage, storyArgs.size]);

  const [isOpen, setOpen] = useState<string>();

  useEffect(() => {
    setOpen(args.open ? CONTROLLED_MODAL_ID : undefined);
  }, [args.open]);

  const openModal: MouseEventHandler<HTMLButtonElement> = e => {
    const modalName = e.currentTarget.getAttribute('data-test-id');

    if (modalName) {
      setOpen(modalName.replace('open-', ''));
    }
  };

  const closeModal = () => setOpen(undefined);

  const alignProp = args.size === Size.M ? alignM : align;

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <ButtonFilled
          size={ButtonFilled.sizes.M}
          label='Open modal'
          onClick={openModal}
          data-test-id={CONTROLLED_MODAL_ID}
        />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.buttons}>
          Examples:
          {Object.values(MODAL_IDS).map(id => (
            <ButtonFilled
              key={id}
              size={ButtonFilled.sizes.M}
              label={`Open ${id}`}
              onClick={openModal}
              data-test-id={`open-${id}`}
            />
          ))}
        </div>
      </div>

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Modal
        {...args}
        align={alignProp}
        picture={getStoryPicture({
          showImage,
          showIcon,
          icon: args.icon,
          picture: args.picture,
        })}
        open={isOpen === CONTROLLED_MODAL_ID}
        onClose={closeModal}
        approveButton={{ ...args.approveButton, onClick: closeModal }}
        cancelButton={!args.cancelButton ? undefined : { ...args.cancelButton, onClick: closeModal }}
        additionalButton={!args.additionalButton ? undefined : { ...args.additionalButton, onClick: closeModal }}
      />

      <Modal
        {...DEFAULT_ARGS}
        open={isOpen === MODAL_IDS.withIcon}
        picture={PICTURE_ARGS.icon}
        onClose={closeModal}
        approveButton={{ ...DEFAULT_ARGS.approveButton, onClick: closeModal }}
        cancelButton={{ ...DEFAULT_ARGS.cancelButton, onClick: closeModal }}
        additionalButton={{ ...DEFAULT_ARGS.additionalButton, onClick: closeModal }}
      />

      <Modal
        {...DEFAULT_ARGS}
        open={isOpen === MODAL_IDS.withImage}
        picture={PICTURE_ARGS.image}
        onClose={closeModal}
        approveButton={{ ...DEFAULT_ARGS.approveButton, onClick: closeModal }}
        cancelButton={{ ...DEFAULT_ARGS.cancelButton, onClick: closeModal }}
        additionalButton={{ ...DEFAULT_ARGS.additionalButton, onClick: closeModal }}
      />

      <Modal
        {...DEFAULT_ARGS}
        content={undefined}
        mode={Modal.modes.Aggressive}
        open={isOpen === MODAL_IDS.aggressive}
        onClose={closeModal}
        approveButton={{ ...DEFAULT_ARGS.approveButton, onClick: closeModal }}
        cancelButton={{ ...DEFAULT_ARGS.cancelButton, onClick: closeModal }}
        additionalButton={{ ...DEFAULT_ARGS.additionalButton, onClick: closeModal }}
      />

      <Modal
        {...DEFAULT_ARGS}
        content={undefined}
        mode={Modal.modes.Forced}
        open={isOpen === MODAL_IDS.forced}
        onClose={closeModal}
        approveButton={{ ...DEFAULT_ARGS.approveButton, onClick: closeModal }}
        cancelButton={{ ...DEFAULT_ARGS.cancelButton, onClick: closeModal }}
        additionalButton={{ ...DEFAULT_ARGS.additionalButton, onClick: closeModal }}
      />

      <Modal
        title='Удалить элемент?'
        subtitle='После удаления элемента он станет недоступен'
        mode={Modal.modes.Forced}
        open={isOpen === MODAL_IDS.deleteModal}
        onClose={closeModal}
        approveButton={{ label: 'Удалить', appearance: ButtonFilled.appearances.Red, onClick: closeModal }}
        additionalButton={{ label: 'Отмена', onClick: closeModal }}
      />
    </>
  );
};

export const modal: StoryObj<StoryProps> = Template.bind({});

modal.args = {
  ...DEFAULT_ARGS,
  disclaimer: {
    text: 'Disclaimer Text Written in no more than 2 lines',
    link: {
      text: 'Link text',
      href: '#',
    },
  },
};

modal.argTypes = {
  ...ARG_TYPES,
  showIcon: {
    ...ARG_TYPES.showIcon,
    if: {
      arg: 'size',
      eq: Modal.sizes.S,
    },
  },
};

modal.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/rpkpVhfaeFNajYXlFNkllN/Modal?type=design&node-id=0%3A1&mode=design&t=KLRZX3TvkkGUhKqw-1',
  },
};
