import { IMask } from 'react-imask';

export const DATE_MASK_CONFIG = {
  mask: IMask.MaskedDate,
  min: new Date(1000, 0, 1),
  max: new Date(9999, 11, 31),
  lazy: true,
};

export const PLACEHOLDER = 'ДД.ММ.ГГГГ';
