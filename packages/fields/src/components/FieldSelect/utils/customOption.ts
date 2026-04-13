import { KeyboardEvent } from 'react';

import { FieldSelectMultipleAddCustomOptionTrigger } from '../types';

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
