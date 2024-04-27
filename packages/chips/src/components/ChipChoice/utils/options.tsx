import { ReactNode } from 'react';

import { ItemContent, ItemId, ItemProps } from '@snack-uikit/list';

import { BaseOption, ContentRenderProps, FilterOption } from '../types';
import { isAccordionOption, isGroupOption, isGroupSelectOption, isNextListOption } from './typeGuards';

export function transformOptionsToItems<T extends ContentRenderProps = ContentRenderProps>(
  options: FilterOption<T>[],
  contentRender?: (option: { label: ItemId; value?: ItemId; contentRenderProps?: T; disabled?: boolean }) => ReactNode,
): ItemProps[] {
  return options.map(option => {
    if (isAccordionOption<T>(option) || isNextListOption<T>(option)) {
      const { label, options, id, contentRenderProps, disabled, ...rest } = option;

      return {
        ...rest,
        disabled,
        id,
        content: contentRender ? (
          contentRender({ label, contentRenderProps, disabled })
        ) : (
          <ItemContent option={label} {...contentRenderProps} disabled={disabled} />
        ),
        items: transformOptionsToItems<T>(options),
      };
    }

    if (isGroupSelectOption<T>(option)) {
      const { options, ...rest } = option;

      return {
        ...rest,
        items: transformOptionsToItems<T>(options),
      };
    }

    if (isGroupOption(option)) {
      const { options, ...rest } = option;

      return {
        ...rest,
        items: transformOptionsToItems(options),
      };
    }

    const { label, value, contentRenderProps, disabled, ...rest } = option as BaseOption<T>;

    return {
      ...rest,
      disabled,
      id: value,
      content: contentRender ? (
        contentRender({ label, contentRenderProps, disabled, value })
      ) : (
        <ItemContent option={label} {...contentRenderProps} disabled={disabled} />
      ),
    };
  });
}
