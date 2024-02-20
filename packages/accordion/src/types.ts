import { ReactElement, ReactNode } from 'react';

import { WithSupportProps } from '@snack-uikit/utils';

import { SELECTION_MODE } from './constants';

export type CollapseBlockSecondaryProps = WithSupportProps<{
  /** Уникальный id блока */
  id: string;
  /** Заголовок */
  header: ReactNode;
  /** Дополнительные действия */
  actions?: ReactNode;
  /** Вложенный контент */
  children: ReactNode;
  /** CSS-класс */
  className?: string;
}>;

export type CollapseBlockPrimaryProps = CollapseBlockSecondaryProps & {
  /** Внешний бордер  */
  outline?: boolean;
};

export type CollapseBlockProps = CollapseBlockPrimaryProps | CollapseBlockSecondaryProps;

export type AccordionProps = WithSupportProps<{
  /** Вложенный контент */
  children: ReactElement<CollapseBlockProps> | ReactElement<CollapseBlockProps>[];
  /** CSS-класс */
  className?: string;
}> &
  (
    | {
        /** Начальное состояние */
        expandedDefault?: string;
        /** Controlled состояние */
        expanded?: string;
        /** Controlled обработчик измения состояния */
        onExpandedChange?(value: (string | undefined) | string): void;
        /** Режим работы аккордиона */
        selectionMode?: typeof SELECTION_MODE.Single;
      }
    | {
        /** Начальное состояние */
        expandedDefault?: string[];
        /** Controlled состояние */
        expanded?: string[];
        /** Controlled обработчик измения состояния */
        onExpandedChange?(value: (string[] | undefined) | string[]): void;
        /** Режим работы аккордиона */
        selectionMode: typeof SELECTION_MODE.Multiple;
      }
  );
