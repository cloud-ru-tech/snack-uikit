import cn from 'classnames';
import { FocusEvent, KeyboardEvent, MouseEvent, useCallback, useContext, useEffect, useRef } from 'react';

import { Counter } from '@snack-ui/counter';
import { Typography } from '@snack-ui/typography';
import { WithSupportProps } from '@snack-ui/utils';

import { Type } from '../../constants';
import { TabBarContext, TabsContext } from '../../context';
import { getTabContentId } from '../../utils';
import styles from './styles.module.scss';

export type TabProps = WithSupportProps<{
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  counter?: number;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
}>;

const MAP_TYPE_TO_PROPS = {
  [Type.Primary]: {
    typographyProps: {
      role: Typography.roles.Title,
      size: Typography.sizes.M,
    },
    counterProps: {
      size: Counter.sizes.M,
    },
  },
  [Type.Secondary]: {
    typographyProps: {
      role: Typography.roles.Label,
      size: Typography.sizes.L,
    },
    counterProps: {
      size: Counter.sizes.S,
    },
  },
};

export function Tab({ label, value, disabled = false, className, onClick, counter, ...otherProps }: TabProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { onSelect, type, focusedTab, onFocus } = useContext(TabBarContext);
  const { selectedTab, setSelectedTab } = useContext(TabsContext);
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
      if (e.code === 'Enter' || e.code === 'Space') {
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
      <Typography
        className={styles.container}
        tag={Typography.tags.div}
        family={Typography.families.Sans}
        {...typographyProps}
      >
        {label}
        {counter && <Counter value={counter} data-test-id={`tabs__tab-counter-${value}`} {...counterProps} />}
      </Typography>
    </button>
  );
}
