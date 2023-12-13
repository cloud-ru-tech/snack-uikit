import { useMergeRefs } from '@floating-ui/react';
import { forwardRef, KeyboardEvent, PropsWithChildren, useCallback, useContext, useRef, useState } from 'react';

import { Droplist } from '../components';
import { DroplistContext } from '../components/Droplist/DroplistContext';
import { BaseDroplistItem, BaseDroplistItemProps } from './BaseDroplistItem';

export type DroplistItemExpandableProps = PropsWithChildren<BaseDroplistItemProps>;

export const DroplistItemExpandable = forwardRef<HTMLButtonElement, DroplistItemExpandableProps>(
  function DroplistItemExpandable({ children, onKeyDown, ...props }, forwardedRef) {
    const [autofocus, setAutofocus] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean | undefined>();
    const itemRef = useRef<HTMLButtonElement>();

    const ref = useMergeRefs([forwardedRef, itemRef]);

    const openAndSetFocus = useCallback(() => {
      setAutofocus(true);
      setIsOpen(true);
    }, []);

    const onKeyDownHandler = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        onKeyDown?.(e);

        if (['Space', 'Enter', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
          openAndSetFocus();
        }
      },
      [onKeyDown, openAndSetFocus],
    );

    const setFirstElementRef = useCallback(
      (element: HTMLButtonElement | null) => {
        if (autofocus) {
          element?.focus();
          setAutofocus(false);
        }
      },
      [autofocus],
    );

    const focusLeaveHandler = useCallback((direction: string) => {
      if (['left', 'common'].includes(direction)) {
        itemRef.current?.focus();
        setIsOpen(false);
      }
    }, []);

    const { size } = useContext(DroplistContext);

    return (
      <Droplist
        size={size}
        className={'inner'}
        placement='right-start'
        trigger='hover'
        triggerElement={<BaseDroplistItem {...props} onKeyDown={onKeyDownHandler} open={isOpen} hasSublist={true} />}
        open={isOpen}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        triggerRef={ref}
        firstElementRefCallback={setFirstElementRef}
        onOpenChange={setIsOpen}
        onFocusLeave={focusLeaveHandler}
        offset={0}
      >
        {children}
      </Droplist>
    );
  },
);
