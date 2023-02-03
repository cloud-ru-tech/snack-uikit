import { DATA_TEST_AND_ARIA_REGEXP } from './private/constants';
import { excludeProps } from './private/excludeProps';

export function excludeSupportProps(props: any) {
  return excludeProps(props, DATA_TEST_AND_ARIA_REGEXP);
}
