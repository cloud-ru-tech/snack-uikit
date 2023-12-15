import cn from 'classnames';
import { memo, useContext } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { ELEMENT_TYPE, ITEM_RENDER_MODE } from '../../constants';
import { BreadcrumbsContext } from '../../context';
import { Item, ItemRenderMode } from '../../types';
import { getTestId } from '../../utils';
import { CrumbsTypography } from '../CrumbsTypography';
import styles from './styles.module.scss';

export type CrumbProps = WithSupportProps<{
  renderMode: ItemRenderMode;
  className?: string;
  minWidth?: number;
  current?: boolean;
  item: Item;
  useIconOnly?: boolean;
}>;

const ELLIPSIS_LABEL_LENGTH = 8;

export const Crumb = memo(function Crumb({
  minWidth: minWidthProp = 0,
  current = false,
  renderMode,
  className,
  item: { label: labelProp, shortLabel, icon: Icon, id, onClick, href },
  useIconOnly: useIconOnlyProp,
  ...rest
}: CrumbProps) {
  const { hidden, size, testId } = useContext(BreadcrumbsContext);
  const isLabelShouldBeEllipse = hidden && labelProp.length > ELLIPSIS_LABEL_LENGTH;
  const label =
    isLabelShouldBeEllipse && renderMode === ITEM_RENDER_MODE.Ellipsis ? `${labelProp.substring(0, 4)}...` : labelProp;
  const useIconOnly = Boolean(Icon && useIconOnlyProp);

  const minWidth = minWidthProp && renderMode === ITEM_RENDER_MODE.Ellipsis ? minWidthProp : 'auto';

  const dataAttributes = {
    'data-render-mode': renderMode,
    'data-current': current,
    'data-hidden': hidden,
    'data-size': size,
    'data-id': id,
  };

  const content = (
    <>
      {Icon && (
        <div className={styles.icon}>
          <Icon size={16} />
        </div>
      )}
      {!useIconOnly && (
        <CrumbsTypography size={size} className={styles.label}>
          {renderMode === ITEM_RENDER_MODE.ShortLabel ? shortLabel : label}
        </CrumbsTypography>
      )}
    </>
  );

  const tabIndex = hidden ? { tabIndex: -1 } : {};

  const title = renderMode === ITEM_RENDER_MODE.Ellipsis ? label : '';

  let crumb = null;
  if (href) {
    crumb = (
      <a
        className={styles.crumb}
        onClick={onClick}
        href={href}
        aria-label={useIconOnly ? label : undefined}
        data-clickable={true}
        {...dataAttributes}
        {...tabIndex}
      >
        {content}
      </a>
    );
  } else if (onClick) {
    crumb = (
      <button
        title={title}
        onClick={onClick}
        className={styles.crumb}
        aria-label={useIconOnly ? label : undefined}
        data-clickable={true}
        {...dataAttributes}
        {...tabIndex}
      >
        {content}
      </button>
    );
  } else {
    crumb = (
      <div className={styles.crumb} {...dataAttributes}>
        {content}
      </div>
    );
  }

  return (
    <li
      {...extractSupportProps(rest)}
      {...dataAttributes}
      data-test-id={getTestId('crumb', testId)}
      className={cn(styles.wrapper, className)}
      data-element-type={ELEMENT_TYPE.Item}
      style={{ minWidth }}
      title={title}
    >
      {crumb}
    </li>
  );
});
