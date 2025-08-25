import { isBrowser } from '../../../utils';
import { BaseSource } from './baseSource';

export class LocalStorageSource<TData> extends BaseSource<TData> {
  getFromSource(): string {
    if (isBrowser()) {
      return localStorage.getItem(this.filterKey) || '';
    }
    return '';
  }

  setToSource(value: string): void {
    if (isBrowser()) {
      localStorage.setItem(this.filterKey, value);
    }
  }
}
