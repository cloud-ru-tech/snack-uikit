import { Filter, Named } from 'style-dictionary';

import { FilterName } from './constants';

export const SourceTokensFilter: Named<Filter> = {
  name: FilterName.SourceTokens,
  matcher: token => token.isSource,
};
