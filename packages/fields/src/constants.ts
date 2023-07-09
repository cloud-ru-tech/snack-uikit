export enum Size {
  S = 's',
  M = 'm',
  L = 'l',
}

export enum ButtonSize {
  S = 's',
  M = 'm',
}

export const ButtonSizeMap = {
  [Size.S]: ButtonSize.S,
  [Size.M]: ButtonSize.M,
  [Size.L]: ButtonSize.M,
};

export enum ValidationState {
  Default = 'default',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export enum ContainerVariant {
  SingleLine = 'single-line-container',
  MultiLine = 'multi-line-container',
}
