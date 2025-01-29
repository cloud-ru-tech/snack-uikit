import { ValueOf } from '@snack-uikit/utils';

import {
  ChipChoiceCustomProps,
  ChipChoiceDateProps,
  ChipChoiceDateRangeProps,
  ChipChoiceMultipleProps,
  ChipChoiceSingleProps,
  ChipChoiceTimeProps,
} from '../ChipChoice';
import { CHIP_CHOICE_TYPE } from '../ChipChoice/constants';
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

type ChipChoiceDateTimeType = {
  type: typeof CHIP_CHOICE_TYPE.DateTime;
} & Omit<ChipChoiceDateProps, 'mode'> & { mode: 'date-time'; showSeconds?: boolean };

type ChipChoiceTimeType = {
  type: typeof CHIP_CHOICE_TYPE.Time;
} & ChipChoiceTimeProps;

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
  | ChipChoiceDateTimeType
  | ChipChoiceTimeType
  | ChipChoiceDateRangeType
  | ChipChoiceCustomType
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitBetter<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type FilterValue = Parameters<ChipChoiceProps['onChange']>[number];
