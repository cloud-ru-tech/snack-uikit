export const getTestId = (prefix: string, testId?: string) => (testId ? `${prefix}-element-${testId}` : '');
