import { describe, expect, it } from 'vitest';

import { interpolateTranslation } from '../interpolateTranslation';

describe('interpolateTranslation', () => {
  it('replaces a single placeholder', () => {
    const result = interpolateTranslation('Hello there {{who}}!', { who: 'General Kenobi' });
    expect(result).toBe('Hello there General Kenobi!');
  });

  it('replaces numbers correctly', () => {
    const result = interpolateTranslation('{{zero}}, {{three}}', {
      zero: 0,
      three: 3,
    });
    expect(result).toBe('0, 3');
  });

  it('keeps placeholder intact when value is an empty string or undefined', () => {
    const result = interpolateTranslation('{{value}}, "{{toBeUndefined}}" and /{{toBeEmptyString}}/"', {
      toBeEmptyString: '',
      value: 'value',
    });
    expect(result).toBe('value, "{{toBeUndefined}}" and /{{toBeEmptyString}}/"');
  });

  it('returns original text when there are no placeholders', () => {
    const result = interpolateTranslation('No placeholders here', { nothing: 'to replace' });
    expect(result).toBe('No placeholders here');
  });
});
