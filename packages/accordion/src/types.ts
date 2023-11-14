import { ReactElement, ReactNode } from 'react';

import { WithSupportProps } from '@snack-ui/utils';

import { AccordionMode } from './constants';

export type CollapseBlockProps = WithSupportProps<{
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
        expanded?: string | string[] | null;
        /** Controlled обработчик измения состояния */
        onExpandedChange?(id: string | null): void;
        /** Режим работы аккордиона */
        mode?: AccordionMode.Single;
      }
    | {
        /** Начальное состояние */
        expandedDefault?: string[];
        /** Controlled состояние */
        expanded?: string[];
        /** Controlled обработчик измения состояния */
        onExpandedChange?(id: string[]): void;
        /** Режим работы аккордиона */
        mode: AccordionMode.Multiple;
      }
  );
