import { configureDevAlerts } from '@sbercloud/ft-debug-mode';

const { error, warning } = configureDevAlerts('uikit-product');

export { error, warning };
