import { ValueOf } from '@snack-uikit/utils';

import {
  ChipChoiceDateProps,
  ChipChoiceDateRangeProps,
  ChipChoiceMultiProps,
  ChipChoiceSingleProps,
} from '../ChipChoice';
import { CHIP_CHOICE_TYPE } from '../ChipChoice/constants';
import { CHIP_CHOICE_ROW_SIZE } from './constants';

export type ChipChoiceRowSize = ValueOf<typeof CHIP_CHOICE_ROW_SIZE>;

type ChipChoiceMultiType = {
  type: typeof CHIP_CHOICE_TYPE.Multi;
} & ChipChoiceMultiProps;

type ChipChoiceSingleType = {
  type: typeof CHIP_CHOICE_TYPE.Single;
} & ChipChoiceSingleProps;

type ChipChoiceDateType = {
  type: typeof CHIP_CHOICE_TYPE.Date;
} & ChipChoiceDateProps;

type ChipChoiceDateRangeType = {
  type: typeof CHIP_CHOICE_TYPE.DateRange;
} & ChipChoiceDateRangeProps;

export type ChipChoiceProps = {
  id: string;
} & (ChipChoiceMultiType | ChipChoiceSingleType | ChipChoiceDateType | ChipChoiceDateRangeType);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitBetter<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type FilterValue = Parameters<ChipChoiceProps['onChange']>[number];
