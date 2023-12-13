import { ReactNode, useEffect, useRef, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { ChevronDownSVG } from '@snack-uikit/icons';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

export type CollapseBlockHeaderContainerProps = {
  children: ReactNode;
  toggleExpanded(): void;
  expanded: boolean;
  actions?: ReactNode;
};

export function CollapseBlockHeaderContainer({
  children,
  toggleExpanded,
  expanded,
  actions,
}: CollapseBlockHeaderContainerProps) {
  const functionLayoutRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<string>('0px');

  useEffect(() => {
    setWidth(() => {
      if (functionLayoutRef.current) {
        return getComputedStyle(functionLayoutRef.current, null).getPropertyValue('width');
      }

      return '0px';
    });
  }, [functionLayoutRef]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.header} data-test-id={TEST_IDS.header} onClick={toggleExpanded}>
      <div className={styles.text} style={{ '--width': width }}>
        {children}
      </div>

      <div className={styles.functionLayout} ref={functionLayoutRef}>
        {actions}

        <ButtonFunction
          className={styles.button}
          data-expanded={expanded || undefined}
          icon={<ChevronDownSVG />}
          size='xs'
          data-test-id={TEST_IDS.chevron}
        />
      </div>
    </div>
  );
}
