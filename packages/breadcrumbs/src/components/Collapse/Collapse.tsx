import { useContext } from 'react';

import { Popover } from '@snack-uikit/popover';

import { ELEMENT_TYPE, ITEM_RENDER_MODE } from '../../constants';
import { BreadcrumbsContext } from '../../context';
import { BreadcrumbsConfigChain } from '../../types';
import { getTestId } from '../../utils';
import { Crumb } from '../Crumb';
import { CrumbsTypography } from '../CrumbsTypography';
import { Separator } from '../Separator';
import styles from './styles.module.scss';

export type CollapseProps = {
  className?: string;
  currentConfig: BreadcrumbsConfigChain;
};

export function Collapse({ currentConfig, className }: CollapseProps) {
  const ctx = useContext(BreadcrumbsContext);
  const { hidden, size, testId } = ctx;

  const collapsedItems = currentConfig.map(node => {
    if (node.element === ELEMENT_TYPE.Item && node.item.renderMode === ITEM_RENDER_MODE.Collapsed) {
      const { id } = node.item;

      return (
        <div key={id} className={styles.collapsedRow}>
          <Crumb item={node.item} renderMode={ITEM_RENDER_MODE.Full} />
          <Separator />
        </div>
      );
    }
    return null;
  });

  const tip = (
    <BreadcrumbsContext.Provider value={{ ...ctx, testId: `${testId}-collapsed` }}>
      {collapsedItems}
    </BreadcrumbsContext.Provider>
  );

  return (
    <div className={className} data-test-id={getTestId('collapse', testId)} data-element-type={ELEMENT_TYPE.Collapse}>
      <Popover tip={tip} trigger='hoverAndFocusVisible' placement='top'>
        <button className={styles.collapse} tabIndex={hidden ? -1 : 0}>
          <CrumbsTypography size={size}>...</CrumbsTypography>
        </button>
      </Popover>
    </div>
  );
}
