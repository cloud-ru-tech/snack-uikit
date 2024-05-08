import { ReactNode } from 'react';

import { ItemId } from '@snack-uikit/list';

import { ContentRenderProps, FilterOption } from '../types';
import { isBaseOption } from './typeGuards';

export type FlattenOption<T extends ContentRenderProps = ContentRenderProps> = {
  value: ItemId;
  label: ItemId;
  contentRenderProps?: T;
  disabled?: boolean;
  hidden?: boolean;
  afterContent?: ReactNode;
  beforeContent?: ReactNode;
};

type KindFlattenOptionsProps<T extends ContentRenderProps = ContentRenderProps> = {
  options: FilterOption<T>[];
};

export function kindFlattenOptions<T extends ContentRenderProps = ContentRenderProps>({
  options,
}: KindFlattenOptionsProps<T>): {
  flattenOptions: Record<string, FlattenOption<T>>;
} {
  const flattenOptions: Record<string, FlattenOption<T>> = {};

  function flatten(option: FilterOption<T>) {
    if (isBaseOption<T>(option)) {
      const { value, label, contentRenderProps, disabled, afterContent, beforeContent, hidden } = option;

      flattenOptions[value] = {
        value,
        label,
        contentRenderProps,
        disabled,
        afterContent,
        beforeContent,
        hidden,
      };

      return;
    }

    const { options } = option;

    for (let idx = 0; idx < options.length; idx++) {
      flatten(options[idx]);
    }

    return;
  }

  for (let idx = 0; idx < options.length; idx++) {
    flatten(options[idx]);
  }

  return {
    flattenOptions,
  };
}
