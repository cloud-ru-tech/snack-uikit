export const notReachable = (_: never): never => {
  throw new Error(`Should never be reached ${_}`);
};
