import { isDateString } from '../src/components/Toolbar/hooks/usePersistState/utils/isDateString';

describe('isDateString', () => {
  it.each([
    '2021-01-01',
    '2021-01-01T00:00:00Z',
    '2021-01-01T00:00:00+00:00',
    '2021-01-01T00:00:00-00:00',
    '12.03.2025',
    '12.03.2025 12:00',
    '12.03.2025 12:00:00',
    '12.03.2025 12:00:00.000',
    '12.03.2025 12:00:00.000Z',
    '12.03.2025 12:00:00.000+00:00',
    '12.03.2025 12:00:00.000-00:00',
  ])('should return true if the value is a date string', value => {
    expect(isDateString(value)).toBe(true);
  });

  it.each(['test-12.12', 'test-1', '192.168.0.1'])('should return false if the value is NOT a date string', value => {
    expect(isDateString(value)).toBe(false);
  });
});
