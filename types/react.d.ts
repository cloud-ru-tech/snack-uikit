// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CSSProperties } from 'react';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CSSProperties {
    [key: `--${string}`]: unknown;
  }
}
