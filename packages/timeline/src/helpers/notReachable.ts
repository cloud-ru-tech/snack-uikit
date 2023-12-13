export const notReachable = (_: unknown): never => {
  throw new Error(`Should never be reached ${_}`);
};
