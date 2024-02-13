import { TextInputFormatter } from '../types';

export const getTextFieldValue = (value: number | number[], textInputFormatter?: TextInputFormatter): string => {
  if (!textInputFormatter) {
    return typeof value === 'number' ? String(value) : value.join(' – ');
  }

  return typeof value === 'number' ? textInputFormatter(value) : value.map(textInputFormatter).join(' – ');
};
