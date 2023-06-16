import { useContext } from 'react';

import { ElementType } from '../../constants';
import { BreadcrumbsContext } from '../../context';
import { getTestId } from '../../utils/getTestId';
import { CrumbsTypography } from '../CrumbsTypography';
import styles from './styles.module.scss';

export function Separator() {
  const { size, separator, testId } = useContext(BreadcrumbsContext);

  return (
    <div
      aria-hidden={true}
      data-size={size}
      className={styles.separator}
      data-test-id={getTestId('separator', testId)}
      data-element-type={ElementType.Separator}
    >
      <CrumbsTypography size={size}>{separator}</CrumbsTypography>
    </div>
  );
}
