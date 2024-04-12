import { ValueOf } from '@snack-uikit/utils';

import { ChipChoiceCustomProps } from '../ChipChoice/components';
import { ChipChoiceDateProps } from '../ChipChoice/components/ChipChoiceDate';
import { ChipChoiceDateRangeProps } from '../ChipChoice/components/ChipChoiceDateRange';
import { CHIP_CHOICE_TYPE } from '../ChipChoice/constants';
import { ChipChoiceMultipleProps, ChipChoiceSingleProps } from '../ChipChoice/types';
import { CHIP_CHOICE_ROW_SIZE } from './constants';

export type ChipChoiceRowSize = ValueOf<typeof CHIP_CHOICE_ROW_SIZE>;

type ChipChoiceMultipleType = {
  type: typeof CHIP_CHOICE_TYPE.Multiple;
} & ChipChoiceMultipleProps;

type ChipChoiceSingleType = {
  type: typeof CHIP_CHOICE_TYPE.Single;
} & ChipChoiceSingleProps;

type ChipChoiceDateType = {
  type: typeof CHIP_CHOICE_TYPE.Date;
} & ChipChoiceDateProps;

type ChipChoiceDateRangeType = {
  type: typeof CHIP_CHOICE_TYPE.DateRange;
} & ChipChoiceDateRangeProps;

type ChipChoiceCustomType = {
  type: typeof CHIP_CHOICE_TYPE.Custom;
} & ChipChoiceCustomProps;

export type ChipChoiceProps = {
  id: string;
} & (
  | ChipChoiceMultipleType
  | ChipChoiceSingleType
  | ChipChoiceDateType
  | ChipChoiceDateRangeType
  | ChipChoiceCustomType
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitBetter<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type FilterValue = Parameters<ChipChoiceProps['onChange']>[number];
