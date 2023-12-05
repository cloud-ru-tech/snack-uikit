import { ReactElement, ReactNode } from 'react';

import { ToggleGroup } from '@snack-uikit/toggles';
import { WithSupportProps } from '@snack-uikit/utils';

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
        expanded?: string;
        /** Controlled обработчик измения состояния */
        onExpandedChange?(value: (string | undefined) | string): void;
        /** Режим работы аккордиона */
        selectionMode?: typeof ToggleGroup.selectionModes.Single;
      }
    | {
        /** Начальное состояние */
        expandedDefault?: string[];
        /** Controlled состояние */
        expanded?: string[];
        /** Controlled обработчик измения состояния */
        onExpandedChange?(value: (string[] | undefined) | string[]): void;
        /** Режим работы аккордиона */
        selectionMode: typeof ToggleGroup.selectionModes.Multiple;
      }
  );
