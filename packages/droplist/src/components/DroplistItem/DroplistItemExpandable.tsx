import { forwardRef, MouseEvent } from 'react';

import { Droplist } from '../Droplist';
import { DroplistItem } from './DroplistItem';
import { DroplistItemMultipleProps } from './DroplistItemMultiple';
import { DroplistItemSingle, DroplistItemSingleProps } from './DroplistItemSingle';
import { BaseDroplistItemProps } from './types';

export type DroplistItemExpandableProps = BaseDroplistItemProps & {
  onClick(e: MouseEvent<HTMLLabelElement>): void;
  nested?: (DroplistItemSingleProps | DroplistItemMultipleProps | DroplistItemExpandableProps)[];
};

export const DroplistItemExpandable = forwardRef<HTMLInputElement, DroplistItemExpandableProps>(
  ({ nested, ...props }, ref) => (
    <>
      {nested ? (
        <Droplist
          className={'inner'}
          placement={Droplist.placements.RightStart}
          content={nested.map(item => (
            // TODO: тут должна быть возможность положить другие виды итемов
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <DroplistItemSingle key={item.label} {...item} />
          ))}
        >
          <DroplistItem variant={DroplistItem.variants.Expandable} {...props} ref={ref} />
        </Droplist>
      ) : (
        <DroplistItem variant={DroplistItem.variants.Expandable} {...props} ref={ref} />
      )}
    </>
  ),
);
