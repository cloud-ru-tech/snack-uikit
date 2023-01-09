import { DATA_TEST_AND_ARIA_REGEXP } from './private/constants';
import { extractProps } from './private/extractProps';

export function extractSupportProps(props: any) {
  return extractProps(props, DATA_TEST_AND_ARIA_REGEXP);
}
