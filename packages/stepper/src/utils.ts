export const getTestIdBuilder = (postfix?: string) => (testId?: string) =>
  postfix && testId ? `${testId}${postfix}` : undefined;
