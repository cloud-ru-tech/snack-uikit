import { MouseEventHandler } from 'react';

import { ItemSingleProps } from '@snack-ui/droplist';
import { WithSupportProps } from '@snack-ui/utils';

import { BaseChipProps } from '../../types';
import { SelectionMode, Size } from './constants';

export type FilterOption = Pick<ItemSingleProps, 'caption' | 'description' | 'tagLabel' | 'icon' | 'avatar'> & {
  label: string;
  value: string;
};

type CommonProps = WithSupportProps<
  Partial<Omit<BaseChipProps, 'label'>> & {
    options: FilterOption[];
    size?: Size;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }
>;

export type SingleSelectionProps = CommonProps & {
  selectionMode: SelectionMode.Single;
  label?: undefined;
  value?: string;
  defaultValue?: string;
  onChangeValue?(value: string): void;
  labelFormatter?(option: FilterOption): string;
};

export type MultiSelectionProps = CommonProps & {
  selectionMode: SelectionMode.Multi;
  label: string;
  value?: string[];
  defaultValue?: string[];
  onChangeValue?(value: string[]): void;
  labelFormatter?(options: FilterOption[]): string;
};
