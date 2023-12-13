import { ArgTypes } from '@storybook/types';

import * as Icons from '@snack-uikit/icons';

import { ModalCustomProps, ModalProps } from '../src';
import { ALIGN, MODE, SIZE } from '../src/constants';
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
  size: SIZE.S,
  align: ALIGN.Default,
  alignM: ALIGN.Default,
  mode: MODE.Regular,
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
  showIcon: false,
  showImage: false,
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
    name: 'align',
    defaultValue: ALIGN.Default,
    options: Object.keys(ALIGN),
    mapping: ALIGN,
    control: {
      type: 'select',
    },
    if: {
      arg: 'size',
      eq: SIZE.S,
    },
  },
  alignM: {
    name: 'align',
    defaultValue: ALIGN.Default,
    options: Object.keys(ALIGN).filter(v => v !== 'Vertical'),
    mapping: ALIGN,
    control: {
      type: 'select',
    },
    if: {
      arg: 'size',
      eq: SIZE.M,
    },
  },
  showImage: {
    name: '[Stories]: Show image',
    defaultValue: false,
    if: {
      arg: 'showIcon',
      eq: false,
    },
  },
  showIcon: {
    name: '[Stories]: Show icon',
    defaultValue: false,
  },
  icon: {
    name: '[Stories]: Choose icon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
    if: {
      arg: 'showIcon',
      eq: true,
    },
  },
};

export const CONTROLLED_MODAL_ID = 'modal-controlled';

export const MODAL_IDS = {
  withImage: 'modal with image',
  withIcon: 'modal with icon',
  aggressive: 'modal Aggressive',
  forced: 'modal Forced',
  deleteModal: 'modal delete',
};
