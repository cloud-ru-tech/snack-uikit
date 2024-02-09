import { useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { DownloadSVG } from '@snack-uikit/icons';
import { Droplist } from '@snack-uikit/list';
import { useLocale } from '@snack-uikit/locale';

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
  const [locales] = useLocale('Table');

  return (
    <Droplist
      trigger='clickAndFocusVisible'
      open={isOpen}
      onOpenChange={setIsOpen}
      scroll
      placement='bottom-end'
      items={[
        {
          content: { option: locales.export + 'CSV' },
          onClick: () => {
            exportToCSV<TData>({ fileName, columnDefinitions, data });
            setIsOpen(false);
          },
        },
        {
          content: { option: locales.export + 'XLSX' },
          onClick: () => {
            exportToXLSX<TData>({ fileName, columnDefinitions, data });
            setIsOpen(false);
          },
        },
      ]}
    >
      <ButtonFunction size='m' icon={<DownloadSVG />} />
    </Droplist>
  );
}
