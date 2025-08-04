import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MouseEventHandler, useEffect, useState } from 'react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Modal, ModalProps } from '../src';
import { SIZE } from '../src/constants';
import { ARG_TYPES, CONTROLLED_MODAL_ID, DEFAULT_ARGS, MODAL_IDS, PICTURE_ARGS } from './constants';
import styles from './styles.module.scss';
import { ExtendedStoryProps } from './types';
import { getStoryPicture } from './utils';

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
};
export default meta;

type StoryProps = ExtendedStoryProps<ModalProps> & {
  customLoadingState?: boolean;
};

const SampleComponent = <div data-test-id='modal__custom-loader'>Custom Loading...</div>;

const Template: StoryFn<StoryProps> = ({
  showIcon,
  showImage,
  align,
  alignM,
  customLoadingState,
  ...args
}: StoryProps) => {
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

  const alignProp = args.size === SIZE.M ? alignM : align;

  const loadingState = customLoadingState ? SampleComponent : undefined;

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <ButtonFilled size='m' label='Open modal' onClick={openModal} data-test-id={CONTROLLED_MODAL_ID} />
      </div>

      <div className={styles.wrapper}>
        <div className={styles.buttons}>
          Examples:
          {Object.values(MODAL_IDS).map(id => (
            <ButtonFilled key={id} size='m' label={`Open ${id}`} onClick={openModal} data-test-id={`open-${id}`} />
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
        loadingState={loadingState}
      />

      <Modal
        {...DEFAULT_ARGS}
        open={isOpen === MODAL_IDS.withIcon}
        picture={PICTURE_ARGS.icon}
        onClose={closeModal}
        approveButton={{ ...DEFAULT_ARGS.approveButton, onClick: closeModal }}
        cancelButton={{ ...DEFAULT_ARGS.cancelButton, onClick: closeModal }}
        additionalButton={{ ...DEFAULT_ARGS.additionalButton, onClick: closeModal }}
        loadingState={loadingState}
      />

      <Modal
        {...DEFAULT_ARGS}
        open={isOpen === MODAL_IDS.withImage}
        picture={PICTURE_ARGS.image}
        onClose={closeModal}
        approveButton={{ ...DEFAULT_ARGS.approveButton, onClick: closeModal }}
        cancelButton={{ ...DEFAULT_ARGS.cancelButton, onClick: closeModal }}
        additionalButton={{ ...DEFAULT_ARGS.additionalButton, onClick: closeModal }}
        loadingState={loadingState}
      />

      <Modal
        {...DEFAULT_ARGS}
        content={undefined}
        mode='aggressive'
        open={isOpen === MODAL_IDS.aggressive}
        onClose={closeModal}
        approveButton={{ ...DEFAULT_ARGS.approveButton, onClick: closeModal }}
        cancelButton={{ ...DEFAULT_ARGS.cancelButton, onClick: closeModal }}
        additionalButton={{ ...DEFAULT_ARGS.additionalButton, onClick: closeModal }}
        loadingState={loadingState}
      />

      <Modal
        {...DEFAULT_ARGS}
        content={undefined}
        mode='forced'
        open={isOpen === MODAL_IDS.forced}
        onClose={closeModal}
        approveButton={{ ...DEFAULT_ARGS.approveButton, onClick: closeModal }}
        cancelButton={{ ...DEFAULT_ARGS.cancelButton, onClick: closeModal }}
        additionalButton={{ ...DEFAULT_ARGS.additionalButton, onClick: closeModal }}
        loadingState={loadingState}
      />

      <Modal
        title='Удалить элемент?'
        subtitle='После удаления элемента он станет недоступен'
        mode='forced'
        open={isOpen === MODAL_IDS.deleteModal}
        onClose={closeModal}
        approveButton={{ label: 'Удалить', appearance: 'destructive', onClick: closeModal }}
        additionalButton={{ label: 'Отмена', onClick: closeModal }}
        loadingState={loadingState}
      />
    </>
  );
};

export const modal: StoryObj<StoryProps> = {
  render: Template,

  decorators: [
    (Story: StoryFn<StoryProps>) => {
      const [storyArgs, setStoryArgs] = useArgs<StoryProps>();

      useEffect(() => {
        if (storyArgs.size !== SIZE.S || storyArgs.showImage) {
          setStoryArgs({ showIcon: false });
        }
      }, [setStoryArgs, storyArgs.showImage, storyArgs.size]);

      return <Story {...storyArgs} />;
    },
  ],

  args: {
    ...DEFAULT_ARGS,
    disclaimer: {
      text: 'Disclaimer Text Written in no more than 2 lines',
      link: {
        text: 'Link text',
        href: '#',
      },
    },
  },

  argTypes: {
    ...ARG_TYPES,
    showIcon: {
      ...ARG_TYPES.showIcon,
      if: {
        arg: 'size',
        eq: 's',
      },
    },
    customLoadingState: {
      if: {
        arg: 'loading',
        eq: true,
      },
      name: '[Stories] Custom loading state',
      type: 'boolean',
    },
    loadingState: { table: { disable: true } },
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
  },
};
