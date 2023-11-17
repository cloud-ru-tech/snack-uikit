import {
  ChipChoiceDateProps,
  ChipChoiceDateRangeProps,
  ChipChoiceMultiProps,
  ChipChoiceSingleProps,
} from '../ChipChoice/components';
import { ChipChoiceType } from '../ChipChoice/constants';

type ChipChoiceMultiType = {
  type: ChipChoiceType.Multi;
} & ChipChoiceMultiProps;

type ChipChoiceSingleType = {
  type: ChipChoiceType.Single;
} & ChipChoiceSingleProps;

type ChipChoiceDateType = {
  type: ChipChoiceType.Date;
} & ChipChoiceDateProps;

type ChipChoiceDateRangeType = {
  type: ChipChoiceType.DateRange;
} & ChipChoiceDateRangeProps;

export type ChipChoiceProps = {
  id: string;
} & (ChipChoiceMultiType | ChipChoiceSingleType | ChipChoiceDateType | ChipChoiceDateRangeType);

export type OmitBetter<T, K extends keyof any> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type FilterValue = Parameters<ChipChoiceProps['onChange']>[number];
