import { Button, ContainerVariant } from '../../types';

export function getContainerVariant({ button }: { button?: Button }): ContainerVariant {
  if (button?.variant === 'before') {
    return 'single-line-container-button-before';
  }

  if (button?.variant === 'after') {
    return 'single-line-container-button-after';
  }

  return 'single-line-container';
}
