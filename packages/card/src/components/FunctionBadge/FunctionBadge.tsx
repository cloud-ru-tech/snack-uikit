import {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Droplist, ItemSingleProps } from '@snack-ui/droplist';
import { KebabSVG } from '@snack-ui/icons';

import { TEST_IDS } from '../../constants';
import { FunctionBadgeContext } from '../../context';
import { TRIGGER_CLOSE_DROPLIST_KEY_CODES, TRIGGER_OPEN_DROPLIST_KEY_KEYS } from './constants';
import styles from './styles.module.scss';

export type FunctionBadgeProps = {
  /** Иконка */
  icon?: ReactNode;
  /** Вложенные опции */
  options: Pick<ItemSingleProps, 'tagLabel' | 'onClick' | 'option' | 'icon' | 'disabled' | 'description' | 'caption'>[];
};

export function FunctionBadge({ icon, options }: FunctionBadgeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [needsFocus, setNeedsFocus] = useState<boolean>(false);

  const { setVisible } = useContext(FunctionBadgeContext);

  useLayoutEffect(() => {
    setVisible && setVisible(isOpen);
  }, [isOpen, setVisible]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (TRIGGER_OPEN_DROPLIST_KEY_KEYS.includes(e.key)) {
      e.preventDefault();
      setNeedsFocus(true);
      setIsOpen(true);
    }

    if (TRIGGER_CLOSE_DROPLIST_KEY_CODES.includes(e.code)) {
      setNeedsFocus(false);
      setIsOpen(false);
    }
  }, []);

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const firstElementRefCallback = (el: HTMLButtonElement | null) => {
    needsFocus && el?.focus();
    setNeedsFocus(false);
  };

  const onFocusLeave = useCallback((direction: 'common' | 'top' | 'bottom' | 'left' | 'right') => {
    if (direction === 'top') {
      buttonRef.current?.focus();
      setIsOpen(false);
      setNeedsFocus(false);
    }
  }, []);

  return (
    <span className={styles.wrapper}>
      <Droplist
        open={isOpen}
        onOpenChange={setIsOpen}
        className={styles.droplist}
        firstElementRefCallback={firstElementRefCallback}
        widthStrategy={Droplist.widthStrategies.Gte}
        useScroll
        onFocusLeave={onFocusLeave}
        data-test-id={TEST_IDS.droplist}
        triggerClassName={styles.triggerClassName}
        placement={Droplist.placements.BottomEnd}
        triggerElement={
          <button
            data-test-id={TEST_IDS.functionBadge}
            ref={buttonRef}
            className={styles.button}
            onKeyDown={onKeyDown}
            onClick={onClick}
            data-focus={isOpen || undefined}
          >
            {icon || <KebabSVG />}
          </button>
        }
      >
        {options.map(item => (
          <Droplist.ItemSingle
            {...item}
            key={item.option}
            className={styles.item}
            data-test-id={TEST_IDS.option}
            onClick={e => {
              item.onClick?.(e);
              setIsOpen(false);
              setNeedsFocus(false);
              e.stopPropagation();
            }}
          />
        ))}
      </Droplist>
    </span>
  );
}
