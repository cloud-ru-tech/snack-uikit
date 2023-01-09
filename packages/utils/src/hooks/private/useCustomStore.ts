import { WindowStore } from '../../types';

export function useCustomStore(): WindowStore['sbercloudUIKit'] {
  const customWindow: WindowStore = window as WindowStore & { sbercloudUIKit: null };

  if (!customWindow.sbercloudUIKit) {
    customWindow.sbercloudUIKit = {};
  }

  return customWindow.sbercloudUIKit;
}
