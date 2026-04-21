import { KeyboardEvent } from 'react';

import { FieldSelectMultipleAddCustomOptionTrigger } from '../types';

/**
 * Сопоставляет код клавиши с поддерживаемым триггером добавления кастомной опции.
 *
 * @param code Код клавиши.
 * @returns Найденный триггер (`enter`/`space`/`comma`) или `undefined`, если код не поддерживается.
 * @function getCustomOptionTriggerByCode
 */
export const getCustomOptionTriggerByCode = (
  code: KeyboardEvent<HTMLInputElement>['code'],
): FieldSelectMultipleAddCustomOptionTrigger | undefined => {
  switch (code) {
    case 'Enter':
      return 'enter';
    case 'Space':
      return 'space';
    case 'Comma':
      return 'comma';
    default:
      return undefined;
  }
};

export const shouldHandleCustomOptionTrigger = (
  trigger: FieldSelectMultipleAddCustomOptionTrigger | undefined,
  availableTriggers: FieldSelectMultipleAddCustomOptionTrigger[],
): trigger is FieldSelectMultipleAddCustomOptionTrigger => (trigger ? availableTriggers.includes(trigger) : false);
