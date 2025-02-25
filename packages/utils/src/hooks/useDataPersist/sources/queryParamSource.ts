import { isBrowser } from '../../../utils';
import { BaseSource } from './baseSource';

export class QueryParamSource<TFilter> extends BaseSource<TFilter> {
  getFromSource(): string {
    if (isBrowser()) {
      return new URL(window.location.href).searchParams.get(this.filterKey) || '';
    }
    return '';
  }

  setToSource(value: string): void {
    if (isBrowser()) {
      const url = new URL(window.location.href);
      url.searchParams.set(this.filterKey, value);
      history.pushState({}, '', url);
    }
  }
}
