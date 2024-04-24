import cn from 'classnames';
import { FocusEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useRef } from 'react';

import { Counter, CounterProps } from '@snack-uikit/counter';
import { Typography, TypographyProps } from '@snack-uikit/typography';
import { WithSupportProps } from '@snack-uikit/utils';

import { TYPE } from '../../constants';
import { useTabBarContext, useTabsContext } from '../../context';
import { Type } from '../../types';
import { getTabContentId } from '../../utils';
import styles from './styles.module.scss';

export type TabProps = WithSupportProps<{
  /** Value вкладки. */
  value: string;
  /** Заголовок вкладки. */
  label: string;
  /** Деактивирована ли вкладка. */
  disabled?: boolean;
  className?: string;
  /** Счетчик, отображающийся внутри кнопки переключения. */
  counter?: number;
  /** Колбек клика по кнопке переключения. */
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}>;

const MAP_TYPE_TO_PROPS: Record<
  Type,
  { typographyProps: Pick<TypographyProps, 'purpose' | 'size'>; counterProps: Pick<CounterProps, 'size'> }
> = {
  [TYPE.Primary]: {
    typographyProps: {
      purpose: 'title',
      size: 'm',
    },
    counterProps: {
      size: 'm',
    },
  },
  [TYPE.Secondary]: {
    typographyProps: {
      purpose: 'label',
      size: 'l',
    },
    counterProps: {
      size: 's',
    },
  },
};

export function Tab({ label, value, disabled = false, className, onClick, counter, ...otherProps }: TabProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { onSelect, type, focusedTab, onFocus } = useTabBarContext();
  const { selectedTab, setSelectedTab } = useTabsContext();
  const selected = value === selectedTab;

  useEffect(() => {
    const { current } = ref;

    if (selected && current) {
      onSelect?.(current);
    }
  }, [selected, ref, onSelect]);

  useEffect(() => {
    const { current } = ref;
    if (focusedTab === value && current) {
      current.focus();
    }
  }, [value, ref, focusedTab]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setSelectedTab(value);
      onClick?.(e);
    },
    [value, onClick, setSelectedTab],
  );

  const clickByEnterOrSpaceKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Space') {
        ref.current?.click();
      }
    },
    [ref],
  );

  const onFocusHandler = useCallback(
    (e: FocusEvent<HTMLButtonElement>) => {
      onFocus?.(e.target, value);
    },
    [onFocus, value],
  );

  if (!type) {
    return null;
  }

  const { typographyProps, counterProps } = MAP_TYPE_TO_PROPS[type];

  return (
    <button
      type='button'
      role='tab'
      data-test-id={`tabs__tab-${value}`}
      {...otherProps}
      id={value}
      ref={ref}
      disabled={disabled}
      data-disabled={disabled}
      className={cn(styles.tab, className)}
      aria-controls={getTabContentId(value)}
      aria-selected={selected}
      data-selected={selected}
      data-type={type}
      onClick={handleClick}
      onFocus={onFocusHandler}
      onKeyDown={clickByEnterOrSpaceKey}
    >
      <Typography className={styles.container} tag='div' family='sans' {...typographyProps}>
        {label}
        {counter && <Counter value={counter} data-test-id={`tabs__tab-counter-${value}`} {...counterProps} />}
      </Typography>
    </button>
  );
}
