import { addons } from '@storybook/manager-api';

import favicon from './assets/TeamSnack.jpg';

const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', favicon);
document.head.appendChild(link);

addons.setConfig({
  panelPosition: 'right',
  sidebar: {
    showRoots: true,
  },
});
