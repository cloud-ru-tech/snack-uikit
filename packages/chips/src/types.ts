import { ReactElement } from 'react';

export type BaseChipProps = {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactElement;
  className?: string;
  tabIndex?: number;
};
