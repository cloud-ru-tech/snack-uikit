import { useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { Droplist } from '@snack-uikit/droplist';
import { DownloadSVG } from '@snack-uikit/icons';

import { exportToCSV, exportToXLSX } from '../../exportTable';
import { ColumnDefinition } from '../../types';

type ExportButtonProps<TData extends object> = {
  /** Данные для отрисовки */
  data: TData[];
  /** Определение внешнего вида и функционала колонок */
  columnDefinitions: ColumnDefinition<TData>[];

  fileName?: string;
};

export function ExportButton<TData extends object>({ fileName, data, columnDefinitions }: ExportButtonProps<TData>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    firstElementRefCallback,
    handleDroplistFocusLeave,
    handleTriggerKeyDown,
    handleDroplistItemKeyDown,
    handleDroplistItemClick,
    triggerElementRef,
  } = Droplist.useKeyboardNavigation<HTMLButtonElement>({ setDroplistOpen: setIsOpen });

  return (
    <Droplist
      firstElementRefCallback={firstElementRefCallback}
      triggerRef={triggerElementRef}
      onFocusLeave={handleDroplistFocusLeave}
      open={isOpen}
      onOpenChange={setIsOpen}
      useScroll
      placement='bottom-end'
      triggerElement={<ButtonFunction size='m' onKeyDown={handleTriggerKeyDown} icon={<DownloadSVG />} />}
    >
      {[
        {
          option: 'Export to CSV',
          onClick: () => {
            exportToCSV<TData>({ fileName, columnDefinitions, data });
          },
        },
        {
          option: 'Export to XLSX',
          onClick: () => {
            exportToXLSX<TData>({ fileName, columnDefinitions, data });
          },
        },
      ].map(({ option, onClick }) => (
        <Droplist.ItemSingle
          option={option}
          onKeyDown={handleDroplistItemKeyDown}
          key={option}
          onClick={e => {
            handleDroplistItemClick(e);
            onClick?.();
          }}
        />
      ))}
    </Droplist>
  );
}
