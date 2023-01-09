import { CoverageMapData } from 'istanbul-lib-coverage';

export declare global {
  interface Window {
    __coverage__: CoverageMapData;
  }
}
