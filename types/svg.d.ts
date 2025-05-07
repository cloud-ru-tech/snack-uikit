declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';

  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}


/// <reference types="vite-plugin-svgr/client" />
declare module '*.svg?raw' {
  const content: string;
  export default content;
}