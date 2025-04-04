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
  /** Проп отвечающий будет ли контент удаляться из DOM дерева */
  removeContentFromDOM?: boolean;
  /** Обработчик клика по хедеру CollapseBlock */
  onClick?(id: string, expanded: boolean): void;
}>;

export type CollapseBlockPrimaryProps = CollapseBlockSecondaryProps & {
  /** Внешний бордер  */
  outline?: boolean;
  /** Форма: круглая или квадратная */
  shape?: 'round' | 'square';
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
