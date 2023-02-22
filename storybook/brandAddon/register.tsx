import { addons, types } from '@storybook/addons';

import { BrandSelector } from './components';
import { CustomBrandsContextProvider } from './contexts';

const ADDON_ID = 'brand-addon';
const TOOLBAR_ITEM_ID = `${ADDON_ID}/upload`;

addons.register(ADDON_ID, () => {
  addons.add(TOOLBAR_ITEM_ID, {
    title: 'Brand Addon',
    type: types.TOOL,
    render: ({ active }) => (
      <CustomBrandsContextProvider>
        <BrandSelector defaultOpen={active} />
      </CustomBrandsContextProvider>
    ),
  });
});
