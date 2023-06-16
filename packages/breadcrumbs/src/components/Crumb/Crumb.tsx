import cn from 'classnames';
import { memo, useContext } from 'react';

import { extractDataProps, extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { ElementType, ItemRenderMode } from '../../constants';
import { BreadcrumbsContext } from '../../context';
import { RawItem } from '../../types';
import { getTestId } from '../../utils/getTestId';
import { CrumbsTypography } from '../CrumbsTypography';
import styles from './styles.module.scss';

export type CrumbProps = WithSupportProps<{
  renderMode: ItemRenderMode;
  className?: string;
  minWidth?: number;
  current?: boolean;
  item: RawItem;
}>;

const ELLIPSIS_LABEL_LENGTH = 8;

export const Crumb = memo(function Crumb({
  minWidth: minWidthProp = 0,
  current = false,
  renderMode,
  className,
  item: { label: labelProp, shortLabel, icon: Icon, id, onClick, href },
  ...rest
}: CrumbProps) {
  const { hidden, size, testId } = useContext(BreadcrumbsContext);
  const isLabelShouldBeEllipse = hidden && labelProp.length > ELLIPSIS_LABEL_LENGTH;
  const label =
    isLabelShouldBeEllipse && renderMode === ItemRenderMode.Ellipsis ? `${labelProp.substring(0, 4)}...` : labelProp;

  const minWidth = minWidthProp && renderMode === ItemRenderMode.Ellipsis ? minWidthProp : 'auto';

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
          <Icon size={24} />
        </div>
      )}
      <CrumbsTypography size={size} className={styles.label}>
        {renderMode === ItemRenderMode.ShortLabel ? shortLabel : label}
      </CrumbsTypography>
    </>
  );

  const tabIndex = hidden ? { tabIndex: -1 } : {};

  const title = renderMode === ItemRenderMode.Ellipsis ? label : '';

  let crumb = null;
  if (href) {
    crumb = (
      <a {...tabIndex} {...dataAttributes} className={styles.crumb} onClick={onClick} href={href} data-clickable>
        {content}
      </a>
    );
  } else if (onClick) {
    crumb = (
      <button title={title} onClick={onClick} className={styles.crumb} {...dataAttributes} {...tabIndex} data-clickable>
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
      {...extractDataProps(rest)}
      {...dataAttributes}
      data-test-id={getTestId('crumb', testId)}
      className={cn(styles.wrapper, className)}
      data-element-type={ElementType.Item}
      style={{ minWidth }}
      title={title}
    >
      {crumb}
    </li>
  );
});
