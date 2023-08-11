import { ArgTypes } from '@storybook/types';

import * as Icons from '@snack-ui/icons';

import { Modal, ModalCustomProps, ModalProps } from '../src';
import image from './image.jpg';
import { ExtendedStoryProps } from './types';

const ICONS = Object.fromEntries(
  Object.keys(Icons).map(key => {
    const Icon = Icons[key];

    return [key, Icon];
  }),
);

export const PICTURE_ARGS: Record<'image' | 'icon' | 'none', ModalProps['picture']> = {
  image: {
    src: image,
    alt: 'test image',
  },
  icon: Icons.PlaceholderSVG,
  none: undefined,
};

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const DEFAULT_ARGS: ExtendedStoryProps<Omit<ModalProps, 'onClose' | 'size'>> & { size?: any } = {
  open: false,
  title: 'Headline',
  titleTooltip: 'tooltip',
  subtitle: 'Subheading',
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate? Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate? Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, repellendus dolorum officiis nemo sequi quam eligendi asperiores ratione veritatis ab quaerat amet mollitia repellat itaque ipsum est delectus voluptatum voluptate?',
  size: Modal.sizes.S,
  align: Modal.aligns.Default,
  appearance: Modal.appearances.Regular,
  approveButton: {
    label: 'Primary',
  },
  cancelButton: {
    label: 'Secondary',
  },
  additionalButton: {
    label: 'Tertiary',
  },
  picture: undefined,
  showPicture: 'none',
  icon: Icons.PlaceholderSVG,
};

export const ARG_TYPES: Partial<ArgTypes<ExtendedStoryProps<ModalProps | ModalCustomProps>>> = {
  titleTooltip: {
    type: 'string',
  },
  subtitle: {
    type: 'string',
  },
  content: {
    type: 'string',
  },
  align: {
    defaultValue: Modal.aligns.Default,
    options: Object.keys(Modal.aligns),
    mapping: Modal.aligns,
    control: {
      type: 'select',
    },
  },
  showPicture: {
    name: '[Stories]: Show picture',
    defaultValue: 'none',
    options: ['none', 'image', 'icon'],
    control: {
      type: 'select',
    },
  },
  icon: {
    name: '[Stories]: Choose icon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
};

export const MODAL_IDS = {
  controlled: 'modal controlled',
  withImage: 'modal with image',
  withIcon: 'modal with icon',
  aggressive: 'modal Aggressive',
  forced: 'modal Forced',
  deleteModal: 'example modal delete',
};
