import { AriaAttributes } from 'react';

export type WithSupportProps<T> = {
  'data-test-id'?: string;
} & AriaAttributes &
  T;
