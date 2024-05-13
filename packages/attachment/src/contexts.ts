import { createContext, useContext } from 'react';

import { AttachmentProps } from './types';

export type AttachmentContextType = Pick<
  AttachmentProps,
  'size' | 'file' | 'truncateVariant' | 'onDownload' | 'onDelete' | 'onRetry' | 'disabled' | 'truncate'
>;

export const AttachmentContext = createContext<AttachmentContextType>({});

export function useAttachmentContext() {
  return useContext(AttachmentContext);
}

export type AttachmentFocusActionsContextType = {
  focused: boolean;
  setFocused(focused: boolean): void;
};

export const AttachmentFocusActionsContext = createContext<AttachmentFocusActionsContextType>({
  focused: false,
  setFocused: () => {},
});

export function useAttachmentFocusActionsContext() {
  return useContext(AttachmentFocusActionsContext);
}
