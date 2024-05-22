import { ReactNode, useEffect, useRef, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { ChevronDownSVG } from '@snack-uikit/icons';

import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';
import { stopPropagationClick } from './utils';

export type CollapseBlockHeaderContainerProps = {
  children: ReactNode;
  toggleExpanded(expanded: boolean): void;
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

  const handleToggleExpanded = () => toggleExpanded(!expanded);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={styles.header} data-test-id={TEST_IDS.header} onClick={handleToggleExpanded}>
      <div className={styles.text} style={{ '--width': width }}>
        {children}
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={styles.functionLayout} ref={functionLayoutRef} onClick={stopPropagationClick}>
        {actions}

        <ButtonFunction
          className={styles.button}
          data-expanded={expanded || undefined}
          icon={<ChevronDownSVG />}
          onClick={handleToggleExpanded}
          size='xs'
          data-test-id={TEST_IDS.chevron}
        />
      </div>
    </div>
  );
}
