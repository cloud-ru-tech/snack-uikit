import { ForwardedRef, MouseEvent, RefObject, useMemo } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { Divider } from '@snack-uikit/divider';
import { useLocale } from '@snack-uikit/locale';
import { TruncateString, TruncateStringProps } from '@snack-uikit/truncate-string';

import { useNewListContext } from '../../components/Lists/contexts';
import { stopPropagation } from '../../utils';
import { SELECT_BUTTON_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

export type SeparatorProps = {
  label?: string;
  truncate?: {
    variant?: TruncateStringProps['variant'];
  };
  mode?: 'primary' | 'secondary';
  divider?: boolean;
  selectButton?: {
    onClick?(e: MouseEvent<HTMLElement>): void;
    indeterminate?: boolean;
    checked?: boolean;
    itemRef?: ForwardedRef<HTMLElement>;
    label?: string;
  };
};

export function Separator({ label, truncate, divider, mode = 'secondary', selectButton }: SeparatorProps) {
  const { size = 's' } = useNewListContext();

  const { t } = useLocale('List');

  const selectButtonJSX = useMemo(() => {
    if (!selectButton) {
      return null;
    }

    const { onClick, checked, itemRef, label } = selectButton;

    return (
      <span className={styles.selectButton} data-size={size} data-weight={(divider && mode) || undefined}>
        <ButtonFunction
          size={SELECT_BUTTON_SIZE_MAP[size]}
          tabIndex={0}
          onClick={e => {
            onClick?.(e);
            e.preventDefault();
            e.stopPropagation();
          }}
          onFocus={stopPropagation}
          ref={itemRef as RefObject<HTMLButtonElement>}
          label={label ?? (checked ? t('groupSelectButton.reset') : t('groupSelectButton.select'))}
        />
      </span>
    );
  }, [divider, mode, selectButton, size, t]);

  if (label) {
    return (
      <div className={styles.separatorWithLabel} data-size={size}>
        <span className={styles.label} data-mode={mode}>
          <TruncateString variant={truncate?.variant} text={label} maxLines={1} />
        </span>

        <div style={{ flex: 1 }}>
          {selectButtonJSX}

          {divider && <Divider weight={mode === 'primary' ? 'regular' : 'light'} className={styles.divider} />}
        </div>
      </div>
    );
  }

  if (divider) {
    return (
      <div className={styles.separatorWithoutLabel} data-size={size}>
        <Divider weight='regular' />
      </div>
    );
  }

  return null;
}
